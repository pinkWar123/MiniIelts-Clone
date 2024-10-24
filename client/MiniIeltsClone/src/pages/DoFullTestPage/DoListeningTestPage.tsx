import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListeningTestViewDto } from "../../types/Responses/listeningTest";
import { getListeningTestById } from "../../services/listeningTest";
import useAnswers from "../../hooks/useAnswers";
import BottomPanel from "./BottomPanel";
import Test from "../../components/DoTest/RenderTest/Test";
import AudioPlayer from "../../components/AudioPlayer";

interface DoListeningTestPageProps {}

const ACTIVE_COLUMN = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 15,
  xl: 9,
};

const INACTIVE_COLUMN = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 3,
  xl: 5,
};

const DoListeningTestPage: FunctionComponent<DoListeningTestPageProps> = () => {
  const { id } = useParams();
  const [test, setTest] = useState<ListeningTestViewDto>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { setAnswers } = useAnswers();
  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return;
      const res = await getListeningTestById(parseInt(id));
      if (res) {
        setTest(res.data);
        setAnswers(
          Array.from({ length: 40 }, (_, index) => ({
            order: index + 1,
            value: "",
            questionType: 0,
          }))
        );
      }
    };
    fetchTest();
  }, [id, setAnswers]);
  const getBottomPanelInfo = () => {
    const infos: {
      order: number;
      start: number;
      end: number;
    }[] = [];
    test?.listeningParts.forEach((test, index) => {
      const start = infos.length > 0 ? infos[infos.length - 1].end + 1 : 1;
      infos.push({
        order: index + 1,
        start: start,
        end:
          start +
          test.listeningExercises
            .map((le) => le.questionCount)
            .reduce((acc, cur) => acc + cur) -
          1,
      });
    });
    return infos;
  };
  const handleChangeTest = (order: number) => setActiveIndex(order - 1);
  console.log(test?.videoId);
  return (
    <div style={{ position: "relative" }}>
      <AudioPlayer videoId={test?.videoId ?? ""} />
      <div style={{ padding: "20px" }}>
        <Test
          mode="do-test"
          exercises={test?.listeningParts[activeIndex].listeningExercises ?? []}
        />
      </div>
      <div style={{ position: "sticky", bottom: 0 }}>
        <BottomPanel
          onChange={handleChangeTest}
          info={getBottomPanelInfo()}
          activeOrder={activeIndex + 1}
          activeColumn={ACTIVE_COLUMN}
          inactiveColumn={INACTIVE_COLUMN}
        />
      </div>
    </div>
  );
};

export default DoListeningTestPage;
