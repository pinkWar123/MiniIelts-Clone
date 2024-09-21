import { FunctionComponent, useEffect, useState } from "react";
import TestDisplay from "../../components/DoTest/TestDisplay";
import Test from "../../components/DoTest/RenderTest/Test";
import Essay from "../../components/DoTest/Essay";
import { FullTestViewDto } from "../../types/Responses/fullTest";
import { getFullTestByIdAsync } from "../../services/fullTest";
import { useParams } from "react-router-dom";
import styles from "./FullTestResultPage.module.scss";
import { Button, Empty, Flex } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
interface ExamReviewProps {}

const ExamReview: FunctionComponent<ExamReviewProps> = () => {
  const { id } = useParams();
  const [fullTest, setFullTest] = useState<FullTestViewDto>();
  const [activeTestIndex, setActiveTestIndex] = useState<number>(0);
  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return;
      const res = await getFullTestByIdAsync(id);
      setFullTest(res.data);
    };
    fetchTest();
  }, [id]);

  const test = fullTest?.tests[activeTestIndex];
  if (!fullTest?.tests) return <Empty />;
  return (
    <div
      className={styles["exam-review-wrapper"]}
      style={{ position: "relative" }}
    >
      <TestDisplay
        test={
          <>
            <Test exercises={test?.exercises ?? []} showAnswer mode="review" />
          </>
        }
        essay={<Essay title={test?.title ?? ""} content={test?.essay ?? ""} />}
      />
      {activeTestIndex > 0 && (
        <div className={styles["prev-nav-wrapper"]}>
          <Button
            shape="circle"
            className={styles["nav-button"]}
            icon={<ArrowLeftOutlined style={{ fontSize: "25px" }} />}
            onClick={() => setActiveTestIndex((prev) => prev - 1)}
          ></Button>
        </div>
      )}
      {activeTestIndex < fullTest?.tests.length - 1 && (
        <div className={styles["next-nav-wrapper"]}>
          <Button
            shape="circle"
            className={styles["nav-button"]}
            icon={<ArrowRightOutlined style={{ fontSize: "25px" }} />}
            onClick={() => setActiveTestIndex((prev) => prev + 1)}
          ></Button>
        </div>
      )}
    </div>
  );
};

export default ExamReview;
