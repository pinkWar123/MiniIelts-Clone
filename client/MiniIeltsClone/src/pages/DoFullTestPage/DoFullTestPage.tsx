import { FunctionComponent, useEffect, useState } from "react";
import { FullTestViewDto } from "../../types/Responses/fullTest";
import { useParams } from "react-router-dom";
import { getFullTestByIdAsync } from "../../services/fullTest";
import { Empty } from "antd";
import TestDisplay from "../../components/DoTest/TestDisplay";
import Essay from "../../components/DoTest/Essay";
import Test from "../../components/DoTest/RenderTest/Test";
import useAnswers from "../../hooks/useAnswers";
import { QuestionTypeEnum } from "../../contants/questionType";
import BottomPanel from "./BottomPanel";

interface DoFullTestPageProps {}

const DoFullTestPage: FunctionComponent<DoFullTestPageProps> = () => {
  const [fullTest, setFullTest] = useState<FullTestViewDto>();
  const { setAnswers } = useAnswers();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { id } = useParams();
  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return;
      const res = await getFullTestByIdAsync(id);
      const tests = res.data.tests;
      const testLength = tests.map((t) => t.questionCount);
      const startIndexes: number[] = [];
      let cur = 1;
      testLength.forEach((t) => {
        startIndexes.push(cur);
        cur += t;
      });
      cur = 1;
      const exerciseLength = tests.map((t) => t.exercises.length);
      const startExerciseIndexes: number[] = [];
      exerciseLength.forEach((e) => {
        startExerciseIndexes.push(cur);
        cur += e;
      });
      const transformedTests = tests.map((t, index) => {
        return {
          ...t,
          exercises: t.exercises.map((e) => {
            return {
              ...e,
              startQuestion: e.startQuestion + startIndexes[index] - 1,
              endQuestion:
                e.startQuestion + startIndexes[index] + e.questionCount - 2,
              order: e.order + startExerciseIndexes[index] - 1,
              questions: e.questions.map((q) => {
                return {
                  ...q,
                  order: q.order + startIndexes[index] - 1,
                };
              }),
            };
          }),
        };
      });
      setFullTest({
        title: res.data.title,
        createdOn: res.data.createdOn,
        tests: transformedTests,
      });
      let questionTypes: QuestionTypeEnum[] = [];
      res.data.tests.forEach((t) =>
        t.exercises.forEach((exercise) => {
          const types = Array.from(
            { length: exercise.endQuestion - exercise.startQuestion + 1 },
            () => exercise.exerciseType
          );
          questionTypes = questionTypes.concat(types);
        })
      );
      setAnswers(
        questionTypes.map((type, index) => ({
          order: index + 1,
          value: "",
          questionType: type,
        }))
      );
    };
    fetchTest();
  }, [id, setAnswers]);
  if (!fullTest) return <Empty />;

  const getBottomPanelInfo = () => {
    const infos: {
      order: number;
      start: number;
      end: number;
    }[] = [];
    fullTest.tests.forEach((test, index) => {
      const start = infos.length > 0 ? infos[infos.length - 1].end + 1 : 1;
      infos.push({
        order: index + 1,
        start: start,
        end: start + test.questionCount - 1,
      });
    });
    return infos;
  };

  const handleChangeTest = (order: number) => setActiveIndex(order - 1);

  return (
    <>
      <TestDisplay
        essay={
          <Essay
            content={fullTest.tests[activeIndex].essay}
            title={fullTest.tests[activeIndex].title}
          />
        }
        test={
          <div key={`test=${activeIndex}`}>
            <Test
              exercises={fullTest.tests[activeIndex].exercises}
              mode="review"
            />
          </div>
        }
      />
      <div style={{ position: "sticky", bottom: 0 }}>
        <BottomPanel
          activeOrder={activeIndex + 1}
          info={getBottomPanelInfo()}
          onChange={handleChangeTest}
        />
      </div>
    </>
  );
};

export default DoFullTestPage;
