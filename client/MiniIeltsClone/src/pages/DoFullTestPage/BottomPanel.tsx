import { Col, Row, Space } from "antd";
import { FunctionComponent } from "react";
import QuestionCircle from "../DoTestPage/BottomPanel/QuestionCircle";
import useAnswers from "../../hooks/useAnswers";
import styles from "./DoFullTestPage.module.scss";
interface BottomPanelProps {
  info: { order: number; start: number; end: number }[];
  activeOrder: number;
  onChange: (value: number) => void;
}

const BottomPanel: FunctionComponent<BottomPanelProps> = ({
  info,
  activeOrder,
  onChange,
}) => {
  const { getAnswerByOrder } = useAnswers();
  return (
    <div className={styles["panel-wrapper"]}>
      <Row
        gutter={4}
        style={{
          height: "80%",
          justifyContent: "center",
        }}
      >
        {info.map((info) => {
          if (info.order === activeOrder) {
            return (
              <Col span={11} onClick={() => onChange(info.order)}>
                <Space
                  className={styles["section-wrapper"]}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {Array.from(
                    { length: info.end - info.start + 1 },
                    (_, index) => (
                      <div key={`circle-${index}`}>
                        <QuestionCircle
                          order={info.start + index}
                          done={
                            getAnswerByOrder(info.start + index)?.value !== ""
                          }
                        />
                      </div>
                    )
                  )}
                </Space>
              </Col>
            );
          }

          return (
            <Col span={6} onClick={() => onChange(info.order)}>
              <div className={styles["section-wrapper"]}>
                Part {info.order} : {info.end - info.start + 1} questions
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default BottomPanel;
