import { EditOutlined, EyeOutlined, KeyOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface TestCardProps {
  id: string;
  picture?: string;
  title: string;
  viewCount: number;
}

const TestCard: FunctionComponent<TestCardProps> = ({
  id,
  picture,
  title,
  viewCount,
}) => {
  const navigate = useNavigate();
  const handleTaskTest = () => {
    navigate(`/test/${id}`);
  };
  return (
    <Card
      style={{ marginTop: "10px", height: "420px" }}
      hoverable
      cover={
        <img
          alt="example"
          src={
            picture === "string" ||
            picture === "example" ||
            picture === "empty picture"
              ? "https://miniieltsbypinkwar.blob.core.windows.net/apiimages/52271514743_a574519057_o.png"
              : picture
          }
          style={{ height: "200px", objectFit: "cover" }}
        />
      }
    >
      <div style={{ marginTop: "-20px", height: "50px" }}>
        <Typography.Paragraph ellipsis={{ rows: 2 }}>
          {title}
        </Typography.Paragraph>
      </div>

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
        onClick={() => navigate(`/test/${id}/view-solution`)}
      >
        View solution
      </Button>
    </Card>
  );
};

export default TestCard;
