import { Col, Layout, Row } from "antd";
import { FunctionComponent } from "react";
import Series from "./Series/Series";
import RelatedTips from "../PostPage/RelatedTips";

interface SeriesPageProps {}

const SeriesPage: FunctionComponent<SeriesPageProps> = () => {
  return (
    <Layout>
      <Layout>
        <Row>
          <Col>
            <Row justify={"center"} gutter={16}>
              <Col sm={20} xs={20} md={16} lg={16}>
                <Series />
              </Col>
              <Col
                sm={20}
                xs={20}
                md={6}
                lg={6}
                style={{ backgroundColor: "#fff", padding: "20px" }}
              >
                <RelatedTips />
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};

export default SeriesPage;
