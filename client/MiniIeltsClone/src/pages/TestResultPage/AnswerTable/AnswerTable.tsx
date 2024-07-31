import { FunctionComponent } from "react";
import styles from "./AnswerTable.module.scss";
import { Table, TableProps } from "antd";
import { QuestionResultDto } from "../../../types/Responses/Test";
import { CheckOutlined, XOutlined } from "@ant-design/icons";
interface AnswerTableProps {
  questionResults?: QuestionResultDto[];
}

const AnswerTable: FunctionComponent<AnswerTableProps> = ({
  questionResults,
}) => {
  const columns: TableProps<QuestionResultDto>["columns"] = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Key",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Your answer",
      dataIndex: "userAnswer",
      key: "userAnswer",
    },
    {
      title: "",
      dataIndex: "isTrue",
      key: "isTrue",
      render: (isTrue: boolean) =>
        isTrue ? (
          <CheckOutlined style={{ color: "green" }} />
        ) : (
          <XOutlined style={{ color: "red" }} />
        ),
    },
  ];
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["title"]}>Answer Table</div>
      <div>
        <Table
          columns={columns}
          dataSource={questionResults}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default AnswerTable;
