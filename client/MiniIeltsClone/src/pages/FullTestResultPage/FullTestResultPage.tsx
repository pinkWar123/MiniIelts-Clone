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
          <UrlBox />
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
