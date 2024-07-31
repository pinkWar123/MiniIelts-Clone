import { EditOutlined, EyeOutlined, KeyOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tag, Typography } from "antd";
import { FunctionComponent } from "react";
import { CategoryEnum } from "../contants/categories";
import { useNavigate } from "react-router-dom";

interface TestCardProps {
  id: string;
  picture?: string;
  title: string;
  viewCount: number;
  category: number;
}

const TestCard: FunctionComponent<TestCardProps> = ({
  id,
  picture,
  title,
  viewCount,
  category,
}) => {
  const navigate = useNavigate();
  const handleTaskTest = () => {
    navigate(`/test/${id}`);
  };
  return (
    <Card
      style={{ marginTop: "10px" }}
      hoverable
      cover={
        <img
          alt="example"
          src={
            picture === "string" || picture === "example"
              ? "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              : picture
          }
          style={{ maxHeight: "100px" }}
        />
      }
    >
      <div style={{ marginTop: "-20px" }}>
        <Typography.Link>{title}</Typography.Link>
      </div>
      <Tag color="green">{CategoryEnum[category]}</Tag>
      <Flex
        justify="space-between"
        style={{ fontSize: "12px", marginTop: "10px" }}
      >
        <Flex>
          <EyeOutlined />
          {viewCount}
        </Flex>
        17-may-19
      </Flex>
      <Button
        icon={<EditOutlined />}
        style={{ width: "100%", marginTop: "20px" }}
        type="primary"
        onClick={handleTaskTest}
      >
        Take test
      </Button>
      <Button
        icon={<KeyOutlined />}
        style={{ width: "100%", marginTop: "10px", backgroundColor: "#f0ad4e" }}
      >
        View solution
      </Button>
    </Card>
  );
};

export default TestCard;
