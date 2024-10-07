import { FunctionComponent } from "react";
import UploadHandler from "../../../components/UploadHandler";
import { Col, FloatButton, Row, Splitter, Tooltip, Typography } from "antd";
import Editor from "../../../components/Editor/Editor";
import parse from "html-react-parser";
import usePost from "../../../hooks/usePost";
import { CheckOutlined } from "@ant-design/icons";
interface PostEditorProps {
  handleSubmit: () => Promise<void>;
}

const PostEditor: FunctionComponent<PostEditorProps> = ({ handleSubmit }) => {
  const { props, onPreview, quillRef, content, setContent, title, setTitle } =
    usePost();
  return (
    <Row>
      <Col span={22} offset={1}>
        <Splitter>
          <Splitter.Panel
            style={{ padding: "20px 20px" }}
            defaultSize={"50%"}
            min={"40%"}
          >
            <UploadHandler props={props} onPreview={onPreview} />
            <Typography.Title level={2} editable={{ onChange: setTitle }}>
              {title}
            </Typography.Title>
            <Editor
              quillRef={quillRef}
              editorHtml={content ?? ""}
              setEditorHtml={setContent}
            />
          </Splitter.Panel>
          <Splitter.Panel
            style={{ padding: "20px 20px" }}
            defaultSize={"50%"}
            min={"40%"}
          >
            <Typography.Title>{title}</Typography.Title>
            <Typography.Paragraph>{parse(content ?? "")}</Typography.Paragraph>
          </Splitter.Panel>
        </Splitter>
      </Col>
      <Tooltip title="Create post">
        <FloatButton
          type="primary"
          icon={<CheckOutlined />}
          onClick={handleSubmit}
        >
          Post
        </FloatButton>
      </Tooltip>
    </Row>
  );
};

export default PostEditor;
