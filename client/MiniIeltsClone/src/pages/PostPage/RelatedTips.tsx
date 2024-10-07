import { Card, Flex, Space, Typography } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { PostListingDto } from "../../types/Responses/post";
import { getRandomPosts } from "../../services/post";
import Tip from "./Tip";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "./PostPage.module.scss";
interface RelatedTipsProps {}

const RelatedTips: FunctionComponent<RelatedTipsProps> = () => {
  const [tips, setTips] = useState<PostListingDto[]>();
  const fetchTips = useCallback(async () => {
    const res = await getRandomPosts();
    console.log(res);
    setTips(res.data);
  }, []);
  useEffect(() => {
    fetchTips();
  }, [fetchTips]);
  return (
    <Card style={{ marginTop: "50px" }}>
      <Flex justify="center">
        <Typography.Title level={4} style={{ marginBottom: "20px" }}>
          Related IELTS Tips
        </Typography.Title>
      </Flex>
      {tips?.map((tip, index) => (
        <Tip {...tip} key={index} />
      ))}
      <Flex justify="center">
        <Space className={styles["refresh"]} onClick={fetchTips}>
          <ReloadOutlined />
          Refresh
        </Space>
      </Flex>
    </Card>
  );
};

export default RelatedTips;
