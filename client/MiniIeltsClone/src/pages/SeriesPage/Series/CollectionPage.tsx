import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SeriesCollectionViewDto } from "../../../types/Responses/series";
import { getCollectionsBySeriesId } from "../../../services/series";
import { Button, Card, Col, Flex, Row, Space, Typography } from "antd";
import CustomImage from "../../../components/CustomImage";
import RelatedTips from "../../PostPage/RelatedTips";
import {
  BookOutlined,
  CustomerServiceOutlined,
  KeyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import styles from "./Series.module.scss";
interface CollectionPageProps {}

const CollectionPage: FunctionComponent<CollectionPageProps> = () => {
  const { id } = useParams();
  const [series, setSeries] = useState<SeriesCollectionViewDto>();
  useEffect(() => {
    const fetchCollectios = async () => {
      if (!id) return;
      const res = await getCollectionsBySeriesId(parseInt(id));
      setSeries(res.data);
    };
    fetchCollectios();
  }, [id]);
  console.log(series);
  return (
    <Row gutter={16} style={{ width: "100%" }}>
      <Col offset={1} span={16} style={{ marginTop: "50px" }}>
        <Row gutter={16}>
          <Col>
            <CustomImage
              style={{ width: "200px", height: "200px", borderRadius: "10px" }}
              picture={series?.image ?? ""}
            />
          </Col>
          <Col>
            <Typography.Title>{series?.title}</Typography.Title>
          </Col>
        </Row>

        {series?.collections.map((collection) => (
          <Card>
            <Typography.Title level={3}>
              Practice test {collection.order}
            </Typography.Title>
            <Row gutter={16}>
              <Col flex={1}>
                <Card className={styles["card"]}>
                  <Flex justify="center">
                    <Space>
                      <CustomerServiceOutlined
                        className={styles["icon"]}
                        id={styles["listening"]}
                      />{" "}
                      <h3>Listening</h3>
                    </Space>
                  </Flex>
                  <div className={styles["btn-row"]}>
                    <Flex justify="center" style={{ width: "100%" }}>
                      <Button
                        shape="round"
                        className={styles["take-test-btn"]}
                        icon={<ThunderboltOutlined />}
                        id={styles["listening-btn"]}
                      >
                        <a href={`/listening/${collection.listeningTestId}`}>
                          Take test
                        </a>
                      </Button>
                    </Flex>

                    <div style={{ width: "100%" }}>
                      <Flex justify="center">
                        <a
                          href={`/listening/${collection.listeningTestId}/solution`}
                        >
                          <Button
                            shape="circle"
                            icon={<KeyOutlined />}
                          ></Button>
                        </a>
                      </Flex>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col flex={1}>
                <Card className={styles["card"]}>
                  <Flex justify="center">
                    <Space>
                      <BookOutlined
                        className={styles["icon"]}
                        id={styles["reading"]}
                      />{" "}
                      <h3>Reading</h3>
                    </Space>
                  </Flex>
                  <div className={styles["btn-row"]}>
                    <Flex justify="center">
                      <Button
                        shape="round"
                        className={styles["take-test-btn"]}
                        icon={<ThunderboltOutlined />}
                        id={styles["reading-btn"]}
                      >
                        <a href={`/full-test/${collection.readingTestId}`}>
                          Take test
                        </a>
                      </Button>
                    </Flex>

                    <div style={{ width: "100%" }}>
                      <Flex justify="center">
                        <a
                          href={`/full-test/${collection.readingTestId}/solution`}
                        >
                          <Button
                            shape="circle"
                            icon={<KeyOutlined />}
                          ></Button>
                        </a>
                      </Flex>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        ))}
      </Col>
      <Col span={6}>
        <RelatedTips />
      </Col>
    </Row>
  );
};

export default CollectionPage;
