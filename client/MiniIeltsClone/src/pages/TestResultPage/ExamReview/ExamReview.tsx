import { FunctionComponent, useEffect, useState } from "react";
import TestDisplay from "../../../components/DoTest/TestDisplay";
import Test from "../../../components/DoTest/RenderTest/Test";
import Essay from "../../../components/DoTest/Essay";
import { IResponseTest } from "../../../types/Model/Test";
import { getTestById } from "../../../services/test";

interface ExamReviewProps {
  id: string;
}

const ExamReview: FunctionComponent<ExamReviewProps> = ({ id }) => {
  const [test, setTest] = useState<IResponseTest>();
  useEffect(() => {
    const fetchTest = async () => {
      const res = await getTestById(id);
      setTest(res.data);
    };
    fetchTest();
  }, [id]);

  if (!test) return <></>;
  return (
    <>
      <TestDisplay
        test={<Test exercises={test.excercises} showAnswer />}
        essay={<Essay title={test.title} content={test.essay} />}
      />
    </>
  );
};

export default ExamReview;
