import { FunctionComponent, useEffect, useState } from "react";
import FullTestResultPage from "./FullTestResultPage";
import { useLocation, useParams } from "react-router-dom";
import {
  FullTestResultDto,
  SubmitFullTestDto,
} from "../../types/Responses/fullTest";
import { getFullTestResultByQuery } from "../../services/fullTest";
import useAnswers from "../../hooks/useAnswers";
import { IDoTestAnswer } from "../../types/Model/Answer";

interface FullTestResultByQueryProps {}

const FullTestResultByQuery: FunctionComponent<
  FullTestResultByQueryProps
> = () => {
  const location = useLocation();
  const { setAnswers } = useAnswers();
  const { id } = useParams();
  const [result, setResult] = useState<FullTestResultDto>();
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const answers = search.getAll("a");
    const time = search.get("time");
    if (!answers || answers.length === 0) return;
    const submitFullTestDto: SubmitFullTestDto = {
      time: parseInt(time ?? "" ?? 0),
      answers: answers.map((a, index) => ({
        order: index + 1,
        value: a,
        questionType: 0,
      })),
    };
    const submit = async () => {
      if (!id) return;
      const res = await getFullTestResultByQuery(
        parseInt(id),
        submitFullTestDto
      );
      setResult(res.data);
      console.log(res.data);
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
    };
    submit();
  }, [id, location.search, setAnswers]);
  if (!result) return <></>;
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

export default FullTestResultByQuery;
