import { FunctionComponent, useEffect, useState } from "react";
import MainHeader from "../../components/Header/Header";
import { useLocation, useParams } from "react-router-dom";
import { Flex, Typography } from "antd";
import { getTestResult } from "../../services/test";
import { TestSubmitDto } from "../../types/Request/Test";
import NotFound from "../NotFound/NotFound";
import { TestResultDto } from "../../types/Responses/Test";
import Performance from "./Performance/Performance";
import BandScoreDisplay from "./BandScoreDisplay/BandScoreDisplay";
import styles from "./TestResultPage.module.scss";
import AnswerTable from "./AnswerTable/AnswerTable";
import ExamReview from "./ExamReview/ExamReview";
import useAnswers from "../../hooks/useAnswers";
interface TestResultPageProps {}

const TestResultPage: FunctionComponent<TestResultPageProps> = () => {
  const { id } = useParams();
  const location = useLocation();
  const [testResult, setTestResult] = useState<TestResultDto>();
  const { setAnswers } = useAnswers();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const fetchTestResult = async () => {
      if (!id) return;
      const testSubmitDto: TestSubmitDto = {
        questionSubmitDtos: [],
      };

      const answers = query.getAll("a");
      let order = 1;
      answers.forEach((answer) =>
        testSubmitDto.questionSubmitDtos.push({ order: order++, value: answer })
      );

      setAnswers(testSubmitDto.questionSubmitDtos);

      const res = await getTestResult(parseInt(id), testSubmitDto);

      if (res.status === 200) {
        console.log(res.data.data);
        setTestResult(res.data.data);
      }
    };

    fetchTestResult();
  }, [id, location.search]);
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
      <ExamReview id={id} />
    </>
  );
};

export default TestResultPage;
