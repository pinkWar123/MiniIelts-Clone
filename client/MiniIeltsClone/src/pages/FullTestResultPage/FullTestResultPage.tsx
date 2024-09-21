import { FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Flex,
  message,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import {
  CarryOutOutlined,
  CopyOutlined,
  KeyOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { FullTestKeyDto } from "../../types/Responses/fullTest";
import { useParams } from "react-router-dom";
import { getFullTestSolution } from "../../services/fullTest";
import AnswerList from "./AnswerList";
import CustomImage from "../../components/CustomImage";
import styles from "./FullTestResultPage.module.scss";
import ExamReview from "./ExamReview";
interface FullTestResultPageProps {}

const FullTestResultPage: FunctionComponent<FullTestResultPageProps> = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState<FullTestKeyDto>();
  useEffect(() => {
    const fetchSolution = async () => {
      if (!id) return;
      const res = await getFullTestSolution(parseInt(id));
      setSolution(res.data);
    };
    fetchSolution();
  }, [id]);
  console.log(solution);
  return (
    <>
      <Row
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Col span={2}></Col>
        <Col span={14}>
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
              <Typography.Title level={2}>
                IELTS Mock Test 2024 January
              </Typography.Title>
              <div>
                <Space>
                  <SnippetsOutlined /> Posted on: <strong>06 Sep 2023</strong>
                </Space>
              </div>
              <div>
                <Space>
                  <CarryOutOutlined /> Tests taken: <strong>1,225,109</strong>
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
            {solution?.testKeys.map((key) => (
              <div key={`solution-${key.part}`}>
                <AnswerList testKey={key} />
              </div>
            ))}
          </div>
        </Col>
        <Col span={6}>
          <div className={styles["share-score-wrapper"]}>
            <Flex className={styles["title"]} justify="center">
              Share your score
            </Flex>
            <div className={styles["url-box"]}>
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {window.location.href}
              </a>
            </div>
            <Flex justify="center">
              <Tooltip title="Copy link">
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => {
                    const textToCopy = window.location.href;
                    navigator.clipboard
                      .writeText(textToCopy)
                      .then(() => {
                        message.success("Copy to clipboard!");
                      })
                      .catch(() => {
                        message.error("Failed to copy to clipboard");
                      });
                  }}
                >
                  Copy
                </Button>
              </Tooltip>
            </Flex>
          </div>
        </Col>
        <Col span={2} />
      </Row>
      <Row>
        <Col span={1} />
        <Col span={22}>
          <ExamReview />
        </Col>
        <Col span={1} />
      </Row>
    </>
  );
};

export default FullTestResultPage;
