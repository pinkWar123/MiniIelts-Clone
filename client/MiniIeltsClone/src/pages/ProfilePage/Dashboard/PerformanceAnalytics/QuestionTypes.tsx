import { FunctionComponent, useEffect, useState } from "react";
import { QuestionStatistics } from "../../../../types/Responses/questionStatistics";
import {
  callGetListeningQuestionStatistics,
  callGetQuestionStatistics,
  callGetQuestionStatisticsByAdmin,
} from "../../../../services/profile";
import { Divider, Flex } from "antd";
import { convertQuestionTypeEnumToDescription } from "../../../../helpers/convertQuestionType";
import styles from "./PerformanceAnalytics.module.scss";
import { useParams } from "react-router-dom";
import { IResponse } from "../../../../types/Responses/response";
interface QuestionTypesProps {
  activeTab: number;
}

const QuestionTypes: FunctionComponent<QuestionTypesProps> = ({
  activeTab,
}) => {
  const [readingStat, setReadingStat] = useState<QuestionStatistics[]>();
  const [listeningStat, setListeningStat] = useState<QuestionStatistics[]>();
  const { id } = useParams();
  useEffect(() => {
    const fetchStat = async () => {
      let res: IResponse<QuestionStatistics[]>;
      if (id) res = await callGetQuestionStatisticsByAdmin(id);
      else res = await callGetQuestionStatistics();
      if (res.data) setReadingStat(res.data);
      console.log(res.data);
    };
    fetchStat();
  }, [id]);

  useEffect(() => {
    const fetchStat = async () => {
      let res: IResponse<QuestionStatistics[]>;
      if (id) res = await callGetListeningQuestionStatistics();
      else res = await callGetListeningQuestionStatistics();
      if (res.data) setListeningStat(res.data);
    };
    fetchStat();
  }, [id]);

  const getActiveStat = () => {
    if (activeTab === 0) return listeningStat;
    else if (activeTab === 1) return readingStat;
  };

  return (
    <>
      <Flex justify="space-between" className={styles["stat-title"]}>
        <div>Question types</div>
        <div>Accuracy</div>
      </Flex>
      <Divider />
      {getActiveStat()?.map((stat) => (
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
