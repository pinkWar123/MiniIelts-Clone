import { Card, Flex, Statistic } from "antd";
import { FunctionComponent } from "react";
import styles from "./Dashboard.module.scss";
interface StatisticTitleProps {
  title: string;
  icon: React.ReactNode;
}
interface StatisticCardProps extends StatisticTitleProps {
  value: string | number;
}

const StatisticTitle: FunctionComponent<StatisticTitleProps> = ({
  title,
  icon,
}) => {
  return (
    <div className={styles["title-container"]}>
      <Flex justify="center" className={styles["icon"]}>
        {icon}
      </Flex>
      <Flex justify="center" className={styles["title"]}>
        {title}
      </Flex>
    </div>
  );
};

const StatisticCard: FunctionComponent<StatisticCardProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <Card>
      <Statistic
        title={<StatisticTitle title={title} icon={icon} />}
        value={value}
        precision={2}
        valueStyle={{
          display: "flex",
          justifyContent: "center",
          fontWeight: 700,
        }}
      />
    </Card>
  );
};

export default StatisticCard;
