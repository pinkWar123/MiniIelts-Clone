import { FunctionComponent, useEffect, useState } from "react";
import FullTestResultPage from "./FullTestResultPage";
import { FullTestResultDto } from "../../types/Responses/fullTest";
import { useParams } from "react-router-dom";
import { getFullTestResultById } from "../../services/fullTest";
import { Empty } from "antd";
import useAnswers from "../../hooks/useAnswers";
import { IDoTestAnswer } from "../../types/Model/Answer";

interface FullTestResultByIdPageProps {}

const FullTestResultByIdPage: FunctionComponent<
  FullTestResultByIdPageProps
> = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState<FullTestResultDto>();
  const { setAnswers } = useAnswers();
  useEffect(() => {
    const fetchResult = async () => {
      if (!resultId) return;
      const res = await getFullTestResultById(parseInt(resultId));
      console.log(res);
      if (res.data) {
        setResult(res.data);
        const answers: IDoTestAnswer[] = [];
        res.data.results.forEach((r) =>
          r.questionResults.forEach((q) => {
            const answer: IDoTestAnswer = {
              order: q.order,
              value: q.userAnswer,
              questionType: 0,
            };
            answers.push(answer);
          })
        );
        setAnswers(answers);
      }
    };
    fetchResult();
  }, [resultId, setAnswers]);
  if (!result) return <Empty></Empty>;
  return (
    <FullTestResultPage
      showUserAnswer
      {...result}
      keys={result.results.map((r) => ({
        ...r,
        keys: r.questionResults.map((q) => ({
          value: q.answer,
          userAnswer: q.userAnswer,
          order: q.order,
        })),
      }))}
    />
  );
};

export default FullTestResultByIdPage;
