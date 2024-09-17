import { FunctionComponent } from "react";
import styles from "./DoTest.module.scss";
import { Resizable } from "re-resizable";
import { Divider, Flex, Typography } from "antd";
import SubmitButton from "../Buttons/SubmitButton";
import useAnswers from "../../hooks/useAnswers";
interface TestDisplayProps {
  essay: React.ReactElement;
  test: React.ReactElement;
  mode: "review" | "doTest";
}

const TestDisplay: FunctionComponent<TestDisplayProps> = ({
  essay,
  test,
  mode,
}) => {
  const { handleSubmit } = useAnswers();
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
        <div className={styles["right-container"]}>
          {test}
          {mode === "review" && (
            <div>
              <Divider />
              <Flex justify="center">
                <Typography.Title level={3}>End of the test</Typography.Title>
              </Flex>
              <Flex justify="center">
                <Typography.Title level={5}>
                  Please submit to view your score and solutions
                </Typography.Title>
              </Flex>
              <Flex justify="center">
                <SubmitButton onClick={handleSubmit} />
              </Flex>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TestDisplay;
