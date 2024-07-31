import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IResponseTest } from "../../types/Model/Test";
import { getTestById } from "../../services/test";
import DoTestLayout from "../../layouts/DoTestLayout/DoTestLayout";
import Essay from "../../components/DoTest/Essay";
import Test from "../../components/DoTest/RenderTest/Test";
import BottomPanel from "./BottomPanel/BottomPanel";
import useAnswers from "../../hooks/useAnswers";

interface DoTestPageProps {}

const DoTestPage: FunctionComponent<DoTestPageProps> = () => {
  const [test, setTest] = useState<IResponseTest>();
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
          const answers = Array.from(
            { length: _test.questionCount },
            (_, index) => index + 1
          ).map((order) => ({
            order,
            value: "",
          }));
          setAnswers(answers);
        }
      } catch (error) {
        navigate("");
      }
    };
    fetchTest();
  }, [id, navigate]);
  if (!id || !test) return <></>;
  return (
    <>
      <DoTestLayout
        essay={<Essay title={test.title} content={test.essay} />}
        test={<Test exercises={test.excercises} showAnswer />}
      />
      <BottomPanel id={parseInt(id)} />
    </>
  );
};

export default DoTestPage;
