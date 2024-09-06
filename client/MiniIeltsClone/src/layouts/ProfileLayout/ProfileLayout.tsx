import { FunctionComponent } from "react";
import MainHeader from "../../components/Header/Header";
import { Col, Flex, Row } from "antd";
import styles from "./ProfileLayout.module.scss";
import { navigateItems } from "./navigateItems";
import NavigateItem from "./NavigateItem";
import { Outlet, useLocation } from "react-router-dom";
interface ProfileLayoutProps {}

const ProfileLayout: FunctionComponent<ProfileLayoutProps> = () => {
  const location = useLocation();
  const profileString = location.pathname.split("/").pop();
  const isActive = (title: string) => {
    return (
      (profileString === "dashboard" && title === "My Dashboard") ||
      (profileString === "history" && title === "History")
    );
  };
  return (
    <>
      <MainHeader />
      <Flex justify="center">
        <Row gutter={50} className={styles["container"]}>
          <Col span={5} className={styles["first-col"]}>
            {navigateItems.map((item) => (
              <NavigateItem {...item} active={isActive(item.title)} />
            ))}
          </Col>
          <Col span={19}>
            <Outlet />
          </Col>
        </Row>
      </Flex>
    </>
  );
};

export default ProfileLayout;
