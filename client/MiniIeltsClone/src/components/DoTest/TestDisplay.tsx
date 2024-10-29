import { FunctionComponent, useEffect, useState } from "react";
import styles from "./DoTest.module.scss";
import { Splitter } from "antd";
interface TestDisplayProps {
  essay: React.ReactElement;
  test: React.ReactElement;
}

const TestDisplay: FunctionComponent<TestDisplayProps> = ({ essay, test }) => {
  const [isVertical, setIsVertical] = useState(false);

  // Track window resize to switch direction
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsVertical(true); // Vertical on smaller screens
      } else {
        setIsVertical(false); // Horizontal on larger screens
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Splitter
        className={styles["wrapper"]}
        // layout={isVertical ? "vertical" : "horizontal"}
      >
        <Splitter.Panel
          min={"30%"}
          className={styles["left-container"]}
          style={{ height: isVertical ? "50%" : "600px" }}
        >
          {essay}
        </Splitter.Panel>
        <Splitter.Panel min={"30%"} className={styles["right-container"]}>
          {test}
        </Splitter.Panel>
      </Splitter>
    </>
  );
};

export default TestDisplay;
