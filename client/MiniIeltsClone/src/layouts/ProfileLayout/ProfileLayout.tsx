import { FunctionComponent } from "react";
import { Col, Flex, Row } from "antd";
import styles from "./ProfileLayout.module.scss";
import { navigateItems } from "./navigateItems";
import NavigateItem from "./NavigateItem";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
interface ProfileLayoutProps {}

const ProfileLayout: FunctionComponent<ProfileLayoutProps> = () => {
  const location = useLocation();
  const { user } = useUser();
  const navigate = useNavigate();
  const profileString = location.pathname.split("/").pop();
  const isActive = (title: string) => {
    return (
      (profileString === "dashboard" && title === "My Dashboard") ||
      (profileString === "history" && title === "History")
    );
  };
  return (
    <>
      {user && user.roles.includes(ADMIN_ROLE) ? (
        <AdminHeader />
      ) : (
        <NormalHeader />
      )}
      <Flex justify="center">
        <Row gutter={50} className={styles["container"]}>
          <Col span={5} className={styles["first-col"]}>
            {navigateItems.map((item) => (
              <NavigateItem
                {...item}
                active={isActive(item.title)}
                onClick={() => navigate(`./${item.url}`)}
              />
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
