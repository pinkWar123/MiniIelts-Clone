import { FunctionComponent, useEffect, useRef, useState } from "react";
import { App, Button, Form, Input, Typography, UploadFile } from "antd";
import { useUpload } from "../../hooks/useUpload";
import { CreateTestDto } from "../../types/Request/test";
import styles from "./CreateTestPage.module.scss";
import UploadHandler from "../../components/UploadHandler";
import ExerciseList from "./ExerciseList";
import AddExercise from "./AddExercise";
import useTest from "../../hooks/useTest";
import { createTest, updateTest } from "../../services/test";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../components/Editor/Editor";
import ReactQuill from "react-quill";
interface TestPageProps {
  variant: "update" | "create";
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const TestPage: FunctionComponent<TestPageProps> = ({ variant = "create" }) => {
  const { test, setTest } = useTest();
  const essayRef = useRef<ReactQuill | null>(null);
  const { id } = useParams();
  const { modal } = App.useApp();
  const navigate = useNavigate();
  const { handleUpload, props, onPreview, setFileList, fileList } = useUpload();
  const [firstTime, setFirstTime] = useState<boolean>(true);
  useEffect(() => {
    if (!firstTime) return;
    const fileList = test?.picture;
    console.log(fileList);
    if (!fileList) return;
    const uploadFileList: UploadFile = {
      uid: "intial-image",
      url: fileList,
      name: fileList,
    };
    setFileList([uploadFileList]);
    setFirstTime(false);
  }, [test, firstTime]);
  console.log(fileList);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (value: any) => {
    let images;
    if (fileList.length > 0 && !fileList?.some((f) => f.name === test?.picture))
      images = await handleUpload("test");
    alert(images);
    const questionCount = test?.exercises
      .map((e) => e.questionCount)
      .reduce((sum, val) => sum + val, 0);
    const fakeValue: CreateTestDto = {
      ...value,
      ...test,
      picture: images?.data.fileNames[0] ?? test?.picture,
      questionCount: questionCount,
      excercises: test?.exercises,
    };
    console.log("data to send:", fakeValue);
    if (variant === "create") await createTest(fakeValue);
    else if (id) await updateTest(parseInt(id), fakeValue);
    modal.success({
      content:
        "Create test successfully. Do you want to go back to test admin page?",
      onOk: () => navigate("/admin/test"),
      closable: true,
      closeIcon: true,
    });
  };
  return (
    <div className={styles["background"]}>
      <Typography.Title>Create new test</Typography.Title>
      <Form
        layout="horizontal"
        {...formItemLayout}
        variant="filled"
        onFinish={(value) => {
          handleSubmit(value);
        }}
      >
        <Form.Item label="Title" required>
          <Input
            placeholder="Enter the title of the test"
            value={test?.title}
            onChange={(e) =>
              setTest((prev) => {
                if (prev == null) return prev;
                return { ...prev, title: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item label="Essay" required>
          <Editor
            quillRef={essayRef}
            editorHtml={test?.essay ?? ""}
            setEditorHtml={(value) =>
              setTest((prev) => (prev ? { ...prev, essay: value } : prev))
            }
          />
        </Form.Item>
        <Form.Item label="Picture" required>
          <UploadHandler onPreview={onPreview} props={props} />
          <ExerciseList />
          <AddExercise />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {variant === "create" ? "Create test" : "Update test"}
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TestPage;
