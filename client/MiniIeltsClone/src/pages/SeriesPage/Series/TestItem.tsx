import { FunctionComponent } from "react";
import styles from "./Series.module.scss";
import { Typography } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
interface TestItemProps {
  title: string;
  id: number;
}

const TestItem: FunctionComponent<TestItemProps> = ({ title, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles["test"]}
      onClick={() => navigate(`/full-test/${id}`)}
    >
      <Link to={`/full-test/${id}`}>
        <Typography.Title level={5}>{title}</Typography.Title>
        <AimOutlined style={{ color: "orange" }} /> 23,456 taken
      </Link>
    </div>
  );
};

export default TestItem;
