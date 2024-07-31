import { FunctionComponent } from "react";
import { LEVELS } from "./bandScore";
import BandScoreItem from "./BandScoreItem";
interface BandScoreDisplayProps {}

const BandScoreDisplay: FunctionComponent<BandScoreDisplayProps> = () => {
  return (
    <>
      {LEVELS.map((level, index) => (
        <div key={`level-${index}`}>
          <BandScoreItem {...level} />
        </div>
      ))}
    </>
  );
};

export default BandScoreDisplay;
