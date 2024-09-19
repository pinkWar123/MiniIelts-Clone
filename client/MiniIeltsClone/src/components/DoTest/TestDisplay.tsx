import { FunctionComponent } from "react";
import styles from "./DoTest.module.scss";
import { Resizable } from "re-resizable";
interface TestDisplayProps {
  essay: React.ReactElement;
  test: React.ReactElement;
}

const TestDisplay: FunctionComponent<TestDisplayProps> = ({ essay, test }) => {
  return (
    <>
      <div className={styles["wrapper"]}>
        <Resizable
          defaultSize={{ width: "50%", height: "200" }}
          maxWidth={"70%"}
          minWidth={"30%"}
          className={styles["left-container"]}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          {essay}
        </Resizable>
        <div className={styles["right-container"]}>{test}</div>
      </div>
    </>
  );
};

export default TestDisplay;
