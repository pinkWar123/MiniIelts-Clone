import { Col, Divider, Flex, Row, Space, Tag, Typography } from "antd";
import { FunctionComponent } from "react";
import CustomImage from "../../components/CustomImage";
import { EyeOutlined, TagOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import styles from "./PostPage.module.scss";
import { SKILL_COLORS, Skills } from "../../contants/skills";
interface TipProps {
  image?: string;
  title: string;
  content: string;
  tag: Skills;
  id: number;
}

const Tip: FunctionComponent<TipProps> = ({
  image,
  title,
  content,
  id,
  tag,
}) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <CustomImage className={styles["image"]} picture={image ?? ""} />
        </Col>
        <Col span={17}>
          <div className={styles["title"]}>
            {<a href={`/post/${id}`}>{title}</a>}
          </div>
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            {parse(content)}
          </Typography.Paragraph>
          <Flex justify="space-between" className={styles["addition"]}>
            <Tag color={SKILL_COLORS[tag]}>
              <Space>
                <TagOutlined />
                <div>{Skills[tag ?? 0]} TIP</div>
              </Space>
            </Tag>

            <Flex gap="small">
              <EyeOutlined />
              105,575
            </Flex>
          </Flex>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default Tip;
