import { FunctionComponent } from "react";
import AnswerList, { AnswerListProps } from "./AnswerList";
import { Col, Row, Space, Typography } from "antd";
import CustomImage from "../../components/CustomImage";
import {
  CarryOutOutlined,
  KeyOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import styles from "./FullTestResultPage.module.scss";

interface ResultDisplayProps {
  showUserAnswer?: boolean;
  title: string;
  createdOn: string;
  viewCount: number;
  keys: AnswerListProps[];
}

const ResultDisplay: FunctionComponent<ResultDisplayProps> = ({
  title,
  createdOn,
  viewCount,
  keys,
  showUserAnswer,
}) => {
  return (
    <div>
      <Row gutter={16}>
        <Col>
          <Space>
            <CustomImage
              style={{ width: "100px", height: "100px" }}
              picture="https://miniielts-clone.s3.ap-southeast-2.amazonaws.com/test/Etrusion-Process-Final-16001200_20240917_035015468.jpeg"
            />
            <CustomImage
              style={{ width: "100px", height: "100px" }}
              picture="https://miniielts-clone.s3.ap-southeast-2.amazonaws.com/test/Etrusion-Process-Final-16001200_20240917_035015468.jpeg"
            />
            <CustomImage
              style={{ width: "100px", height: "100px" }}
              picture="https://miniielts-clone.s3.ap-southeast-2.amazonaws.com/test/Etrusion-Process-Final-16001200_20240917_035015468.jpeg"
            />
          </Space>
        </Col>
        <Col>
          <Typography.Title level={2}>{title}</Typography.Title>
          <div>
            <Space>
              <SnippetsOutlined /> Posted on: <strong>{createdOn}</strong>
            </Space>
          </div>
          <div>
            <Space>
              <CarryOutOutlined /> Tests taken: <strong>{viewCount}</strong>
            </Space>
          </div>
        </Col>
      </Row>
      <div className={styles["key"]}>
        <Space>
          <KeyOutlined style={{ fontSize: "25px" }} />
          <Typography.Title level={4}>Key</Typography.Title>
        </Space>
      </div>

      <div>
        {keys.map((key) => (
          <div key={`solution-${key.part}`}>
            <AnswerList {...key} showUserAnswer={showUserAnswer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;
