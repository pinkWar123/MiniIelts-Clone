import { Flex } from "antd";
import { FunctionComponent } from "react";
import styles from "./ProfileLayout.module.scss";
export interface NavigateItemProps {
  icon: React.ReactElement;
  title: string;
  active: boolean;
}

const NavigateItem: FunctionComponent<NavigateItemProps> = ({
  icon,
  title,
  active,
}) => {
  return (
    <Flex
      key={`navigate-item-${title}`}
      className={`${styles["nav-item-container"]} ${
        active && styles["active"]
      }`}
    >
      <div className={styles["icon"]}>{icon}</div>
      <div className={styles["title"]}>{title}</div>
    </Flex>
  );
};

export default NavigateItem;
