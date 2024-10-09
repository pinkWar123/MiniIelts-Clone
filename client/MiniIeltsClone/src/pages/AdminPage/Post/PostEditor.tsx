import { FunctionComponent, useState } from "react";
import UploadHandler from "../../../components/UploadHandler";
import {
  Col,
  FloatButton,
  Form,
  Row,
  Select,
  Spin,
  Splitter,
  Tooltip,
  Typography,
} from "antd";
import Editor from "../../../components/Editor/Editor";
import parse from "html-react-parser";
import usePost from "../../../hooks/usePost";
import { CheckOutlined } from "@ant-design/icons";
import { Skills } from "../../../contants/skills";
interface PostEditorProps {
  handleSubmit: () => Promise<void>;
}

const PostEditor: FunctionComponent<PostEditorProps> = ({ handleSubmit }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { props, onPreview, quillRef, post, setPost } = usePost();
  const onSubmit = async () => {
    setLoading(true);
    try {
      await handleSubmit();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Row style={{ minHeight: "100vh" }}>
      <Spin fullscreen spinning={loading} />
      <Col span={22} offset={1}>
        <Splitter>
          <Splitter.Panel
            style={{ padding: "20px 20px" }}
            defaultSize={"50%"}
            min={"40%"}
          >
            <Form layout="vertical">
              <Form.Item label="Post's image">
                <UploadHandler props={props} onPreview={onPreview} />
              </Form.Item>
              <Form.Item label="Title">
                <Typography.Title
                  level={3}
                  editable={{
                    onChange: (value) =>
                      setPost((prev) =>
                        prev ? { ...prev, title: value } : prev
                      ),
                  }}
                >
                  {post?.title}
                </Typography.Title>
              </Form.Item>
              <Form.Item label="Skill:">
                <Select
                  options={Object.keys(Skills)
                    .filter((key) => isNaN(Number(key)))
                    .map((skill) => ({
                      label: skill,
                      value: Skills[skill as keyof typeof Skills],
                    }))}
                  value={post.tag}
                  onChange={(skill) =>
                    setPost((prev) => (prev ? { ...prev, tag: skill } : prev))
                  }
                />
              </Form.Item>
              <Form.Item label="Content:">
                <Editor
                  quillRef={quillRef}
                  editorHtml={post?.content ?? ""}
                  setEditorHtml={(value) =>
                    setPost((prev) =>
                      prev ? { ...prev, content: value } : prev
                    )
                  }
                />
              </Form.Item>
            </Form>
          </Splitter.Panel>
          <Splitter.Panel
            style={{ padding: "20px 20px" }}
            defaultSize={"50%"}
            min={"40%"}
          >
            <Typography.Title>{post?.title}</Typography.Title>
            <Typography.Paragraph>
              {parse(post?.content ?? "")}
            </Typography.Paragraph>
          </Splitter.Panel>
        </Splitter>
      </Col>
      <Tooltip title="Create post">
        <FloatButton type="primary" icon={<CheckOutlined />} onClick={onSubmit}>
          Post
        </FloatButton>
      </Tooltip>
    </Row>
  );
};

export default PostEditor;
