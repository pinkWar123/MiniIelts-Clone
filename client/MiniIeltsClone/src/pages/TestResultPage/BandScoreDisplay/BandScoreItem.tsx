import { FunctionComponent } from "react";
import { BandLevelOptions } from "./bandScore";
import { Col, Row } from "antd";
import styles from "./BandScoreDisplay.module.scss";
export interface BandScoreItemProps {
  title: string;
  value: number | string;
  color: BandLevelOptions;
}

const BandScoreItem: FunctionComponent<BandScoreItemProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <div className={styles[`${color}`]}>
      <Row>
        <Col span={18}>{title}</Col>
        <Col span={6}>{value}</Col>
      </Row>
    </div>
  );
};

export default BandScoreItem;
