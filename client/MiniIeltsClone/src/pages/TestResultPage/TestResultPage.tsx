import { FunctionComponent, useEffect, useState } from "react";
import MainHeader from "../../components/Header/Header";
import { useLocation, useParams } from "react-router-dom";
import { Flex, Typography } from "antd";
import NotFound from "../NotFound/NotFound";
import { TestResultDto } from "../../types/Responses/Test";
import Performance from "./Performance/Performance";
import BandScoreDisplay from "./BandScoreDisplay/BandScoreDisplay";
import styles from "./TestResultPage.module.scss";
import AnswerTable from "./AnswerTable/AnswerTable";
import ExamReview from "./ExamReview/ExamReview";
import useAnswers from "../../hooks/useAnswers";
import { callGetResultById } from "../../services/result";
import { IDoTestAnswer } from "../../types/Model/Answer";
interface TestResultPageProps {}

const TestResultPage: FunctionComponent<TestResultPageProps> = () => {
  const { id } = useParams();
  const location = useLocation();
  const [testResult, setTestResult] = useState<TestResultDto>();
  const { setAnswers } = useAnswers();
  useEffect(() => {
    const fetchTestResult = async () => {
      if (!id) return;

      const res = await callGetResultById(parseInt(id));

      if (res.succeeded) {
        const answers = res.data.questionResults.map(
          (answer) =>
            ({
              order: answer.order,
              value: answer.userAnswer,
              questionType: 0,
            } as IDoTestAnswer)
        );
        setAnswers(answers);
        setTestResult(res.data);
      }
    };

    fetchTestResult();
  }, [id, location.search]);
  console.log(testResult);
  if (!id) return <NotFound />;
  return (
    <>
      <MainHeader />
      <Flex justify="center" className={styles["content"]}>
        <Flex style={{ width: "80%" }} gap="large">
          <div style={{ width: "66.7%" }}>
            <Typography.Title>Your test performance</Typography.Title>
            <Flex justify="center" className={styles["title"]}>
              Solution for {testResult?.title}
            </Flex>
            <Performance
              correct={testResult?.correct ?? 0}
              incorrect={testResult?.incorrect ?? 0}
              unanswered={testResult?.unanswered ?? 0}
              questionCount={testResult?.questionCount ?? 0}
              marks={testResult?.marks ?? 0}
              timeTaken={"13:00"}
            />
            <AnswerTable questionResults={testResult?.questionResults} />
          </div>
          <div className={styles["band-score-wrapper"]}>
            <BandScoreDisplay />
          </div>
        </Flex>
      </Flex>
      <ExamReview id={testResult?.testId?.toString() ?? ""} />
    </>
  );
};

export default TestResultPage;
