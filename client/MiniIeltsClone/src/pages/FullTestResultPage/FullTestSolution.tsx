import { FunctionComponent, useEffect, useState } from "react";
import FullTestResultPage from "./FullTestResultPage";
import { FullTestKeyDto } from "../../types/Responses/fullTest";
import { useParams } from "react-router-dom";
import { getFullTestSolution } from "../../services/fullTest";
import { Empty } from "antd";

interface FullTestSolutionProps {}

const FullTestSolution: FunctionComponent<FullTestSolutionProps> = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState<FullTestKeyDto>();
  useEffect(() => {
    const fetchSolution = async () => {
      if (!id) return;
      const res = await getFullTestSolution(parseInt(id));
      if (res.data) setSolution(res.data);
    };
    fetchSolution();
  }, [id]);
  if (!solution) return <Empty></Empty>;
  return (
    <FullTestResultPage
      {...solution}
      keys={solution?.testKeys.map((t) => {
        return {
          ...t,
          keys: t.keys.map((k) => ({
            value: k.answer,
            order: k.order,
          })),
        };
      })}
    />
  );
};

export default FullTestSolution;
