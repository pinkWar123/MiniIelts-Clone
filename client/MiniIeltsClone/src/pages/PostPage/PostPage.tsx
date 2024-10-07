import { Col, Flex, Rate, Row, Space, Tag, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostViewDto } from "../../types/Responses/post";
import { getPostById } from "../../services/post";
import CustomImage from "../../components/CustomImage";
import { CalendarOutlined, EyeOutlined, TagOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
interface PostPageProps {}
import styles from "./PostPage.module.scss";
import RelatedTips from "./RelatedTips";
import UrlBox from "../../components/UrlBox/UrlBox";
const PostPage: FunctionComponent<PostPageProps> = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostViewDto>();
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await getPostById(parseInt(id));
      console.log(res);
      if (res.data) setPost(res.data);
    };
    fetchPost();
  }, [id]);
  return (
    <>
      <Row className={styles["container"]}>
        <Col span={13} offset={2} style={{ width: "98%" }}>
          <div className={styles["image"]}>
            <CustomImage
              picture={post?.image ?? ""}
              style={{ maxWidth: "90%", maxHeight: "500px" }}
            />
          </div>
          <Typography.Title level={4} className={styles["title"]}>
            {post?.title}
          </Typography.Title>
          <Flex gap="small" className={styles["rating"]}>
            <div className={styles["rate"]}>
              {post?.ratingResult.averageRating}
            </div>
            <Rate
              style={{ fontSize: "16px" }}
              allowHalf
              value={post?.ratingResult.averageRating}
            />
            ({post?.ratingResult.ratingCount} votes)
          </Flex>
          <Flex justify="space-between" style={{ width: "98%" }}>
            <Space>
              <TagOutlined />
              <Tag>Reading tip</Tag>
            </Space>
            <Space>
              <div>
                <EyeOutlined /> 105,570
              </div>
              <div>
                <CalendarOutlined /> 12/01/2018
              </div>
            </Space>
          </Flex>
          <div className={styles["essay"]}>{parse(post?.content ?? "")}</div>
          <Col span={8} offset={8} className={styles["url-box"]}>
            <UrlBox />
          </Col>
        </Col>

        <Col span={7} className={styles["sec-column"]}>
          <Row>
            <Col offset={2} span={20}>
              <RelatedTips />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default PostPage;
