import { FunctionComponent, useCallback, useState } from "react";
import update from "immutability-helper";
import TestItem from "./TestItem";
import { FullTestNameDto } from "../../../types/Responses/series";
import { Button, Divider, Flex } from "antd";
import FullTestDebounceSelect from "../../../components/DebounceSelect/FullTestDebounceSelect";
import { CheckOutlined, XOutlined } from "@ant-design/icons";
import ListeningTestDebounceSelect from "../../../components/DebounceSelect/ListeningDebounceSelect";
interface TestListProps {
  tests: FullTestNameDto[];
  setTests: (dtos: FullTestNameDto[]) => void;
  removeTest: (index: number) => void;
  type: "listening" | "reading";
}

const TestList: FunctionComponent<TestListProps> = ({
  tests,
  setTests,
  removeTest,
  type,
}) => {
  const [adding, setAdding] = useState<boolean>(false);
  const [newTest, setNewTest] = useState<FullTestNameDto>();
  // Function to handle drag and drop, reordering the tests
  const moveTest = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedTest = tests[dragIndex];
      setTests(
        update(tests, {
          $splice: [
            [dragIndex, 1], // Remove the dragged item
            [hoverIndex, 0, draggedTest], // Insert it at the hovered index
          ],
        })
      );
    },
    [tests, setTests]
  );

  const onCancel = () => {
    setAdding(false);
    setNewTest(undefined);
  };
  const onApply = () => {
    if (!newTest) return;
    const newTests = [...tests, newTest];
    setTests(newTests);
    setNewTest(undefined);
    setAdding(false);
  };

  return (
    <div>
      {tests.map((test, index) => (
        <TestItem
          key={test.id}
          index={index}
          test={test}
          moveTest={moveTest}
          removeTest={removeTest}
        />
      ))}
      {!adding && (
        <Divider style={{ color: "red", border: "2px" }}>
          <Flex onClick={() => setAdding(true)}>+ Add test</Flex>
        </Divider>
      )}
      {adding && (
        <>
          <div>
            {type === "reading" ? (
              <FullTestDebounceSelect
                maxCount={1}
                onChange={(dtos) => setNewTest(dtos[0])}
              />
            ) : (
              <ListeningTestDebounceSelect
                maxCount={1}
                onChange={(dtos) => setNewTest(dtos[0])}
              />
            )}
          </div>
          <Flex justify="flex-end" gap={"small"} style={{ marginTop: "12px" }}>
            <Button
              icon={<XOutlined />}
              style={{
                backgroundColor: "red",
                fontSize: "10px",
                color: "white",
              }}
              size="small"
              shape="round"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              icon={<CheckOutlined />}
              style={{ fontSize: "10px", color: "white" }}
              type="primary"
              onClick={onApply}
              size="small"
              shape="round"
            >
              Apply
            </Button>
          </Flex>
        </>
      )}
    </div>
  );
};

export default TestList;
