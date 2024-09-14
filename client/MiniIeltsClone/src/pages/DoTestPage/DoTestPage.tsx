import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITest } from "../../types/Model/Test";
import { getTestById } from "../../services/test";
import DoTestLayout from "../../layouts/DoTestLayout/DoTestLayout";
import Essay from "../../components/DoTest/Essay";
import Test from "../../components/DoTest/RenderTest/Test";
import BottomPanel from "./BottomPanel/BottomPanel";
import useAnswers from "../../hooks/useAnswers";
import { QuestionTypeEnum } from "../../contants/questionType";

interface DoTestPageProps {}

const DoTestPage: FunctionComponent<DoTestPageProps> = () => {
  const [test, setTest] = useState<ITest>();
  const { setAnswers } = useAnswers();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const fetchTest = async () => {
      try {
        const res = await getTestById(id);
        const _test = res.data;
        if (_test) {
          setTest(_test);
          let questionTypes: QuestionTypeEnum[] = [];
          _test.exercises.forEach((exercise) => {
            const types = Array.from(
              { length: exercise.endQuestion - exercise.startQuestion + 1 },
              () => exercise.exerciseType
            );
            questionTypes = questionTypes.concat(types);
          });
          console.log(questionTypes);
          const answers = Array.from(
            { length: _test.questionCount },
            (_, index) => index + 1
          ).map((order) => ({
            order,
            value: "",
            questionType: questionTypes[order - 1],
          }));
          setAnswers(answers);
        }
      } catch (error) {
        navigate("");
      }
    };
    fetchTest();
  }, [id, navigate, setAnswers]);
  if (!id || !test) return <></>;
  return (
    <>
      <DoTestLayout
        essay={<Essay title={test.title} content={test.essay} />}
        test={<Test exercises={test.exercises} />}
      />
      <BottomPanel id={parseInt(id)} />
    </>
  );
};

export default DoTestPage;
