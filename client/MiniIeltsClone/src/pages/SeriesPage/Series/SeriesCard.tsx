import { FunctionComponent } from "react";
import { FullTestNameDto } from "../../../types/Responses/series";
import { Col, Row, Typography } from "antd";
import CustomImage from "../../../components/CustomImage";
import styles from "./Series.module.scss";
import TestItem from "./TestItem";
interface SeriesCardProps {
  image?: string;
  title: string;
  tests: FullTestNameDto[];
}

const SeriesCard: FunctionComponent<SeriesCardProps> = ({
  image,
  title,
  tests,
}) => {
  console.log(image);
  return (
    <div className={styles["series-card"]}>
      <Row gutter={16}>
        <Col span={4}>
          <CustomImage picture={image ?? ""} />
        </Col>
        <Col span={20}>
          <Typography.Title level={4}>{title}</Typography.Title>
          <Row gutter={16}>
            {tests.map((test, index) => (
              <Col span={12} key={index}>
                <TestItem {...test} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SeriesCard;
