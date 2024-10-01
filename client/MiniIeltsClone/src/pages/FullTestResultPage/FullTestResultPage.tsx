import { FunctionComponent } from "react";
import { Button, Col, Flex, message, Row, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import styles from "./FullTestResultPage.module.scss";
import ExamReview from "./ExamReview";
import ResultDisplay from "./ResultDisplay";
import { AnswerListProps } from "./AnswerList";
interface FullTestResultPageProps {
  title: string;
  createdOn: string;
  viewCount: number;
  keys: AnswerListProps[];
  showUserAnswer?: boolean;
}

const FullTestResultPage: FunctionComponent<FullTestResultPageProps> = (
  props
) => {
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
          <ResultDisplay {...props} />
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
