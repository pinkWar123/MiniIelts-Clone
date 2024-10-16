import { FunctionComponent } from "react";
import { Col, Row } from "antd";
import ExamReview from "./ExamReview";
import ResultDisplay from "./ResultDisplay";
import { AnswerListProps } from "./AnswerList";
import UrlBox from "../../components/UrlBox/UrlBox";
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
        justify={"center"}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Col lg={14} xl={14} xxl={14} md={22} sm={22} xs={22} offset={2}>
          <ResultDisplay {...props} />
        </Col>
        <Col lg={6} xl={6} xxl={6} md={14} sm={14} xs={14}>
          <div style={{ marginBottom: "20px" }}>
            <UrlBox />
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
