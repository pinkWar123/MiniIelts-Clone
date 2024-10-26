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
  skill: string;
}

const SeriesCard: FunctionComponent<SeriesCardProps> = ({
  image,
  title,
  tests,
  skill,
}) => {
  return (
    <div className={styles["series-card"]}>
      <Row gutter={16}>
        <Col span={4}>
          <CustomImage picture={image ?? ""} />
        </Col>
        <Col span={20}>
          <Typography.Title ellipsis={{ rows: 2 }} level={4}>
            {title}
          </Typography.Title>
          <Row gutter={16}>
            {tests.map((test, index) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
                <TestItem {...test} skill={skill} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SeriesCard;
