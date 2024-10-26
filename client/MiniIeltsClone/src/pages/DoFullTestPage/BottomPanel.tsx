import { Col, Row, Space } from "antd";
import { FunctionComponent } from "react";
import QuestionCircle from "../DoTestPage/BottomPanel/QuestionCircle";
import useAnswers from "../../hooks/useAnswers";
import styles from "./DoFullTestPage.module.scss";
interface Column {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
interface BottomPanelProps {
  info: { order: number; start: number; end: number }[];
  activeOrder: number;
  onChange: (value: number) => void;
  activeColumn?: Column;
  inactiveColumn?: Column;
}

const DEFAULT_ACTIVE_COLUMN = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 18,
  xl: 11,
};

const DEFAULT_INACTIVE_COLUMN = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 3,
  xl: 6,
};

const BottomPanel: FunctionComponent<BottomPanelProps> = ({
  info,
  activeOrder,
  onChange,
  activeColumn = DEFAULT_ACTIVE_COLUMN,
  inactiveColumn = DEFAULT_INACTIVE_COLUMN,
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
              <Col {...activeColumn} onClick={() => onChange(info.order)}>
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
            <Col {...inactiveColumn} onClick={() => onChange(info.order)}>
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
