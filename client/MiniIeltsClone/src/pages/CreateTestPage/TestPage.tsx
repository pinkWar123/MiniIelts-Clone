import { FunctionComponent, useEffect } from "react";
import { App, Button, Form, Input, Typography, UploadFile } from "antd";
import { useUpload } from "../../hooks/useUpload";
import { CreateTestDto } from "../../types/Request/Test";
import styles from "./CreateTestPage.module.scss";
import UploadHandler from "../../components/UploadHandler";
import ExerciseList from "./ExerciseList";
import AddExercise from "./AddExercise";
import useTest from "../../hooks/useTest";
import { createTest, updateTest } from "../../services/test";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  const { modal } = App.useApp();
  const { handleUpload, props, onPreview, setFileList, fileList } = useUpload();
  useEffect(() => {
    const fileList = test?.picture;
    if (!fileList) return;
    const uploadFileList: UploadFile = {
      uid: "intial-image",
      url: fileList,
      name: fileList,
    };
    setFileList([uploadFileList]);
  }, [test]);
  console.log(fileList);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (value: any) => {
    let images;
    if (fileList.length > 0 && !fileList?.some((f) => f.name === test?.picture))
      images = await handleUpload();
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
      content: "Create test successfully. Do you want to refresh the page?",
      onOk: () => setTest(null),
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
          <Input.TextArea
            rows={4}
            placeholder="Enter the essay"
            value={test?.essay}
            onChange={(e) =>
              setTest((prev) => {
                if (prev == null) return prev;
                return { ...prev, essay: e.target.value };
              })
            }
          />
        </Form.Item>
        <Form.Item label="Picture" required>
          <UploadHandler onPreview={onPreview} props={props} />
          <ExerciseList />
          <AddExercise />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create test
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TestPage;
