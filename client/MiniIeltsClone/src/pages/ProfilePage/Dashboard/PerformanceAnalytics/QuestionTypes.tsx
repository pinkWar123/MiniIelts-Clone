import { FunctionComponent, useEffect, useState } from "react";
import { QuestionStatistics } from "../../../../types/Responses/questionStatistics";
import {
  callGetQuestionStatistics,
  callGetQuestionStatisticsByAdmin,
} from "../../../../services/profile";
import { Divider, Flex } from "antd";
import { convertQuestionTypeEnumToDescription } from "../../../../helpers/convertQuestionType";
import styles from "./PerformanceAnalytics.module.scss";
import { useParams } from "react-router-dom";
import { IResponse } from "../../../../types/Responses/response";
interface QuestionTypesProps {}

const QuestionTypes: FunctionComponent<QuestionTypesProps> = () => {
  const [questionStat, setQuestionStat] = useState<QuestionStatistics[]>();
  const { id } = useParams();
  useEffect(() => {
    const fetchStat = async () => {
      let res: IResponse<QuestionStatistics[]>;
      if (id) res = await callGetQuestionStatisticsByAdmin(id);
      else res = await callGetQuestionStatistics();
      if (res.data) setQuestionStat(res.data);
    };
    fetchStat();
  }, [id]);
  console.log(questionStat);
  return (
    <>
      <Flex justify="space-between" className={styles["stat-title"]}>
        <div>Question types</div>
        <div>Accuracy</div>
      </Flex>
      <Divider />
      {questionStat?.map((stat) => (
        <Flex
          justify="space-between"
          key={`question-stat-${stat.questionType}`}
        >
          <div>{convertQuestionTypeEnumToDescription(stat.questionType)}</div>
          <div className={styles["stat-title"]}>
            {(stat.accuracy * 100).toFixed(2)}%
          </div>
        </Flex>
      ))}
    </>
  );
};

export default QuestionTypes;
