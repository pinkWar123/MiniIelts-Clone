import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getListeningTestById,
  getListeningTestSolution,
} from "../../services/listeningTest";
import { ITest } from "../../types/Model/Test";
import TestDisplay from "../../components/DoTest/TestDisplay";
import Test from "../../components/DoTest/RenderTest/Test";
import { ListeningTestKeyDto } from "../../types/Responses/listeningTest";
import ResultDisplay from "../FullTestResultPage/ResultDisplay";
import { Col, Empty, Row } from "antd";
import UrlBox from "../../components/UrlBox/UrlBox";
import Transcript from "./Transcript";
import styles from "./Listening.module.scss";
interface ListeningSolutionPageProps {}

const ListeningSolutionPage: FunctionComponent<
  ListeningSolutionPageProps
> = () => {
  const { id } = useParams();
  const [test, setTest] = useState<ITest>();
  const [solution, setSolution] = useState<ListeningTestKeyDto>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    if (!id) return;
    const fetchTest = async () => {
      const res = await getListeningTestById(parseInt(id));
      console.log(res);
      const data = res.data;
      const test: ITest = {
        id: "0",
        title: data.title,
        essay: "",
        viewCount: 0,
        questionCount: 40,
        exercises: data.listeningParts.flatMap((lp) => lp.listeningExercises),
      };
      setTest(test);
    };
    fetchTest();
  }, [id, setTest]);
  useEffect(() => {
    if (!id) return;
    const fetchTest = async () => {
      const res = await getListeningTestSolution(parseInt(id));
      setSolution(res.data);
    };
    fetchTest();
  }, [id, setSolution]);
  const getActiveExercises = () => {
    const start = activeIndex * 10 + 1;
    const end = activeIndex * 10 + 10;
    return test?.exercises.filter(
      (e) => e.startQuestion >= start && e.endQuestion <= end
    );
  };
  if (!solution) return <Empty></Empty>;
  return (
    <>
      <Row
        justify={"center"}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Col lg={14} xl={14} xxl={14} md={22} sm={22} xs={22} offset={2}>
          <ResultDisplay
            {...solution}
            keys={
              solution?.testKeys?.map((t) => {
                return {
                  ...t,
                  keys: t.keys.map((k) => ({
                    value: k.answer,
                    order: k.order,
                  })),
                };
              }) ?? []
            }
          />
        </Col>
        <Col lg={6} xl={6} xxl={6} md={14} sm={14} xs={14}>
          <div style={{ marginBottom: "20px" }}>
            <UrlBox />
          </div>
        </Col>
        <Col span={2} />
      </Row>
      <Col offset={1} span={22}>
        <div
          style={{
            border: "20px solid black",
            borderRadius: "20px",
          }}
        >
          <TestDisplay
            essay={
              <div
                className={`${styles["exam-review-wrapper"]} ${styles["right-container"]}`}
              >
                <Test mode="review" exercises={getActiveExercises() ?? []} />
              </div>
            }
            test={
              <Transcript
                transcript={solution.transcripts[activeIndex]}
                videoId={solution.videoId}
                next={() => setActiveIndex((prev) => prev + 1)}
                prev={() => setActiveIndex((prev) => prev - 1)}
                activeIndex={activeIndex}
              />
            }
          />
        </div>
      </Col>
    </>
  );
};

export default ListeningSolutionPage;
