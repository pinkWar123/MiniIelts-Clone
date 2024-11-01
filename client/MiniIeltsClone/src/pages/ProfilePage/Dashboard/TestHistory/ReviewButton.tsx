import { BookOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface ReviewButtonProps {
  type: "test" | "full-test" | "listening";
  resultId: number;
  testId?: number;
}

const ReviewButton: FunctionComponent<ReviewButtonProps> = ({
  type,
  resultId,
  testId,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      style={{ marginTop: "-20px" }}
      icon={<BookOutlined />}
      onClick={() => {
        if (type === "test") navigate(`/result/${resultId}`);
        else if (type === "full-test") {
          navigate(`/full-test/${testId}/result/${resultId}`);
        } else if (type === "listening") {
          navigate(`/listening/${testId}/result/${resultId}`);
        }
      }}
    >
      Review
    </Button>
  );
};

export default ReviewButton;
