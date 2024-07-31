import { Typography } from "antd";
import { FunctionComponent } from "react";
import { formatText } from "../../helpers/text";

interface EssayProps {
  title: string;
  content: string;
}

const Essay: FunctionComponent<EssayProps> = ({ title, content }) => {
  return (
    <div>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Typography.Paragraph style={{ paddingBottom: "150px" }}>
        {formatText(content)}
      </Typography.Paragraph>
    </div>
  );
};

export default Essay;
