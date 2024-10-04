import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Tooltip } from "antd";
import { FunctionComponent, useRef } from "react";
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";

interface TestItemProps {
  test: { id: number; title: string };
  index: number;
  moveTest: (dragIndex: number, hoverIndex: number) => void;
  removeTest: (index: number) => void;
}

interface DragItem {
  index: number;
  type: string;
}

const ItemType = "TEST_ITEM";

const TestItem: FunctionComponent<TestItemProps> = ({
  test,
  index,
  moveTest,
  removeTest,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Handle drag behavior
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType,
    item: { index, type: ItemType },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Handle drop behavior
  const [, drop] = useDrop<DragItem>({
    accept: ItemType,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine the bounding rectangle of the hovered item
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      // Only move when the mouse has crossed half of the item's height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Move the test item
      moveTest(dragIndex, hoverIndex);

      // Update the item index
      item.index = hoverIndex;
    },
  });

  // Attach drag and drop functionality to the ref
  drag(drop(ref));

  return (
    <Flex gap="middle">
      <div
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : 1,
          padding: "8px",
          margin: "4px",
          backgroundColor: "#f0f0f0",
          cursor: "move",
          border: "1px solid #ddd",
        }}
      >
        {test.title}
      </div>
      <Tooltip title="Delete">
        <div
          style={{ alignContent: "center", cursor: "pointer" }}
          onClick={() => removeTest(index)}
        >
          <DeleteOutlined />
        </div>
      </Tooltip>
    </Flex>
  );
};

export default TestItem;
