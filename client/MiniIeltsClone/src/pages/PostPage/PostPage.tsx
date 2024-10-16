import {
  Col,
  Flex,
  message,
  Rate,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostViewDto } from "../../types/Responses/post";
import { getPostById, votePostById } from "../../services/post";
import CustomImage from "../../components/CustomImage";
import { CalendarOutlined, EyeOutlined, TagOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
interface PostPageProps {}
import styles from "./PostPage.module.scss";
import RelatedTips from "./RelatedTips";
import UrlBox from "../../components/UrlBox/UrlBox";
import { SKILL_COLORS, Skills } from "../../contants/skills";
import { PostVoteDto } from "../../types/Request/post";
import useUser from "../../hooks/useUser";
import { formatDate } from "../../helpers/time";
const PostPage: FunctionComponent<PostPageProps> = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [post, setPost] = useState<PostViewDto>();
  const [isVoting, setIsVoting] = useState<boolean>(false);
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await getPostById(parseInt(id));
      console.log(res);
      if (res.data) setPost(res.data);
    };
    fetchPost();
  }, [id]);
  const handleVotePost = async (vote: number) => {
    if (!id) return;
    if (!user) {
      message.error("You have to log in to leave a vote");
      return;
    }
    setIsVoting(true);
    setPost((prev) =>
      prev
        ? {
            ...prev,
            ratingResult: {
              ...prev.ratingResult,
              averageRating: vote,
            },
          }
        : prev
    );
    const voteDto: PostVoteDto = { vote };
    const res = await votePostById(parseInt(id), voteDto);
    setPost((prev) =>
      prev
        ? {
            ...prev,
            ratingResult: {
              ...res.data,
            },
          }
        : prev
    );
    setIsVoting(false);
  };
  return (
    <>
      <Row justify={"center"} className={styles["container"]}>
        <Col
          xxl={13}
          xl={13}
          lg={13}
          md={20}
          sm={20}
          xs={20}
          // offset={2}
          style={{ width: "98%" }}
        >
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
              onChange={(value) => handleVotePost(value)}
            />
            {isVoting && <Spin spinning />}({post?.ratingResult.ratingCount}{" "}
            votes)
          </Flex>
          <Flex justify="space-between" style={{ width: "98%" }}>
            <Tag color={SKILL_COLORS[post?.tag ?? 0]}>
              <Space>
                <TagOutlined />
                <div>{Skills[post?.tag ?? 0]} TIP</div>
              </Space>
            </Tag>
            <Space size="large">
              <div>
                <EyeOutlined /> {post?.viewCount}
              </div>
              <div>
                <CalendarOutlined /> {formatDate(post?.createdOn ?? "")}
              </div>
            </Space>
          </Flex>
          <div className={styles["essay"]}>
            <Typography.Paragraph>
              {parse(post?.content ?? "")}
            </Typography.Paragraph>
          </div>
          <Col span={8} offset={8} className={styles["url-box"]}>
            <UrlBox />
          </Col>
        </Col>

        <Col
          xxl={7}
          xl={7}
          lg={7}
          md={20}
          sm={20}
          xs={20}
          className={styles["sec-column"]}
        >
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
