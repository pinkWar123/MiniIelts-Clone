import { FunctionComponent } from "react";
import styles from "./Listening.module.scss";
import AudioPlayer from "../../components/AudioPlayer";
import parser from "html-react-parser";
import { Button, Space, Typography } from "antd";
interface TranscriptProps {
  videoId: string;
  transcript: string;
  next: () => void;
  prev: () => void;
  activeIndex: number;
}

const Transcript: FunctionComponent<TranscriptProps> = ({
  videoId,
  transcript,
  next,
  prev,
  activeIndex,
}) => {
  return (
    <div
      className={`${styles["left-container"]} ${styles["exam-review-wrapper"]} `}
    >
      <AudioPlayer videoId={videoId} />
      <div className={styles["content"]}>
        <Typography.Paragraph style={{ backgroundColor: "#D6F0F4" }}>
          {parser(transcript)}
        </Typography.Paragraph>
      </div>
      <div className={styles["bottom"]}>
        <strong className={styles["part"]}>Part 2</strong>
        <Space>
          {activeIndex > 0 && <Button onClick={prev}>Previous</Button>}
          {activeIndex < 3 && <Button onClick={next}>Next</Button>}
        </Space>
      </div>
    </div>
  );
};

export default Transcript;
