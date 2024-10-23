import { FunctionComponent, useRef, useState } from "react";
import YouTube from "react-youtube";

interface PlayGroundProps {}

const PlayGround: FunctionComponent<PlayGroundProps> = () => {
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0); // To track the current time
  const [duration, setDuration] = useState(0); // To store the total duration
  const opts = {
    height: "0", // Set height to 0 to hide the video
    width: "0", // Set width to 0 to hide the video
    playerVars: {
      autoplay: 1, // Automatically start playing the audio
      controls: 1, // Hide YouTube controls
    },
  };

  const onReady = (event: any) => {
    // Access the player and control the video (audio in this case)
    playerRef.current = event.target;
    setDuration(event.target.getDuration());

    setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
  };

  const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime); // Seek to the selected time in the video
  };

  const skipSeconds = (seconds: number) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + seconds); // Skip forward by `seconds`
    }
  };

  return (
    <div>
      <h1>Listening Test</h1>
      <YouTube videoId="36oHB1VHIhs" opts={opts} onReady={onReady} />
      <button onClick={() => skipSeconds(10)}>Skip 10 seconds</button>
      <button onClick={() => skipSeconds(-10)}>Rewind 10 seconds</button>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={onSliderChange}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default PlayGround;
