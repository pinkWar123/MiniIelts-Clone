import { FunctionComponent } from "react";
import useUser from "../../hooks/useUser";
import { ADMIN_ROLE } from "../../contants/roles";
import AdminHeader from "../../components/Header/AdminHeader";
import NormalHeader from "../../components/Header/NormalHeader";
import { Outlet } from "react-router-dom";
import styles from "./NormalLayout.module.scss";
import { Col, Row, Typography } from "antd";
interface NormalLayoutProps {}

const NormalLayout: FunctionComponent<NormalLayoutProps> = () => {
  const { user } = useUser();
  return (
    <>
      {user && user.roles.includes(ADMIN_ROLE) ? (
        <AdminHeader />
      ) : (
        <NormalHeader />
      )}
      <Outlet />
      <div className={styles["footer"]}>
        <Row>
          <Col span={20} offset={2}>
            <Row justify={"center"} gutter={16} style={{ padding: "50px 0" }}>
              <Col
                xs={24}
                sm={24}
                md={6}
                xl={6}
                xxl={6}
                className={styles["list"]}
              >
                <div className={styles["list-item"]}>Contact with us</div>
                <div className={styles["list-item"]}>Privacy policy</div>
                <div className={styles["list-item"]}>Sitemap</div>
                <div className={styles["list-item"]}>
                  Frequent asked questions
                </div>
                <div className={styles["list-item"]}>Terms of use</div>
                <div className={styles["list-item"]}>Jobs</div>
                <div className={styles["list-item"]}>
                  Coordinate opportunities
                </div>
              </Col>
              <Col xs={24} sm={24} md={14} xl={14} xxl={14}>
                <Typography.Title level={3} className={styles["white-text"]}>
                  About Us
                </Typography.Title>
                <Typography.Paragraph className={styles["white-text"]}>
                  IELTS Online Tests (IOT) is a product of InterGreat Education
                  Group, established in 2008 with offices in 12 countries. The
                  headquarters of InterGreat is located at 29 Threadneedle
                  Street, London.
                </Typography.Paragraph>
                <Typography.Title level={3} className={styles["white-text"]}>
                  Our Mission
                </Typography.Title>
                <Typography.Paragraph className={styles["white-text"]}>
                  IOT is currently the most accessed IELTS preparation website
                  in over 120 countries with more than 28 million learners. We
                  are a community-driven website offering free exam materials
                  and IELTS preparation tips. With advanced technology features,
                  learners can easily take online IELTS tests and quickly and
                  effectively improve their scores. Additionally, we offer an
                  educational ecosystem that revolves around online education,
                  study abroad counseling, and student support to help students
                  achieve their study abroad goals.
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NormalLayout;
