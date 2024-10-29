import {
  BackwardOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  PauseOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Button, Flex, Slider, Space } from "antd";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import { convertSecondsToMinuteAndSecond } from "../helpers/time";

interface AudioPlayerProps {
  videoId: string;
}

const AudioPlayer: FunctionComponent<AudioPlayerProps> = ({ videoId }) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [currentTime, setCurrentTime] = useState(0); // To track the current time
  const [duration, setDuration] = useState(0); // To store the total duration
  const [volume, setVolume] = useState(50); // To track the volume]
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const opts = {
    height: "0", // Set height to 0 to hide the video
    width: "0", // Set width to 0 to hide the video
    playerVars: {
      autoplay: 0 as 0 | 1, // Automatically start playing the audio
      controls: 1 as 0 | 1, // Hide YouTube controls
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onReady = (event: any) => {
    // Access the player and control the video (audio in this case)
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    playerRef?.current?.setVolume(volume);

    setInterval(async () => {
      if (playerRef.current) {
        setCurrentTime(await playerRef?.current?.getCurrentTime());
      }
    }, 1000);
  };

  const skipSeconds = async (seconds: number) => {
    if (playerRef.current) {
      const currentTime = await playerRef.current.getCurrentTime();
      await playerRef.current.seekTo(currentTime + seconds, true); // Skip forward by `seconds`
    }
  };

  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (isPlaying) playerRef?.current?.playVideo();
    else playerRef?.current?.pauseVideo();
  }, [isPlaying]);

  const handleToggleVideoState = () => setIsPlaying((prev) => !prev);

  return (
    <>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      <Flex>
        <Space>
          <Button shape="circle" onClick={() => skipSeconds(-10)}>
            <BackwardOutlined />
          </Button>
          <Button shape="circle">
            {isPlaying ? (
              <PauseOutlined onClick={handleToggleVideoState} />
            ) : (
              <CaretRightOutlined onClick={handleToggleVideoState} />
            )}
          </Button>
          <Button shape="circle" onClick={() => skipSeconds(10)}>
            <ForwardOutlined />
          </Button>
          <div style={{ marginRight: "10px" }}>
            {convertSecondsToMinuteAndSecond(duration - currentTime)}
          </div>
        </Space>
        <Space></Space>
        <Slider
          tooltip={undefined}
          onChange={(value) => {
            setCurrentTime(value);
            playerRef?.current?.seekTo(value, true);
          }}
          max={duration}
          value={currentTime}
          style={{ width: "50%" }}
        />
        <SoundOutlined />
        <Slider
          max={100}
          value={volume}
          style={{ width: "30%" }}
          onChange={(value) => setVolume(value)}
        />
      </Flex>
    </>
  );
};

export default AudioPlayer;
