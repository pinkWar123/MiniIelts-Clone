import { FunctionComponent } from "react";
import { Flex, Typography } from "antd";
import { TestResultDto } from "../../types/Responses/Test";
import Performance from "./Performance/Performance";
import BandScoreDisplay from "./BandScoreDisplay/BandScoreDisplay";
import styles from "./TestResultPage.module.scss";
import AnswerTable from "./AnswerTable/AnswerTable";
import ExamReview from "./ExamReview/ExamReview";
import { convertSecondsToMinuteAndSecond } from "../../helpers/time";
import useUser from "../../hooks/useUser";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
interface TestResultPageProps {
  testResult?: TestResultDto;
}

const TestResultPage: FunctionComponent<TestResultPageProps> = ({
  testResult,
}) => {
  const { user } = useUser();
  return (
    <>
      {user && user.roles.includes(ADMIN_ROLE) ? (
        <AdminHeader />
      ) : (
        <NormalHeader />
      )}
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
              timeTaken={convertSecondsToMinuteAndSecond(testResult?.time ?? 0)}
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
