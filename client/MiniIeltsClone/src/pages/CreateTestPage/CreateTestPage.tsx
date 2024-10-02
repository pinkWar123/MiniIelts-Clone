import { App, Button, Form, Input, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./CreateTestPage.module.scss";
import AddExercise from "./AddExercise";
import useTest from "../../hooks/useTest";
import ExerciseList from "./ExerciseList";
import { createTest } from "../../services/test";
import { CreateTestDto } from "../../types/Request/test";
import UploadHandler from "../../components/UploadHandler";
import { useUpload } from "../../hooks/useUpload";

interface CreateTestPageProps {}
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

const CreateTestPage: FunctionComponent<CreateTestPageProps> = () => {
  const { test, setTest } = useTest();
  const { modal } = App.useApp();
  const { handleUpload, props, onPreview } = useUpload();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (value: any) => {
    console.log(value);
    const images = await handleUpload("test");
    console.log(images);
    const questionCount = test?.exercises
      .map((e) => e.questionCount)
      .reduce((sum, val) => sum + val, 0);
    const fakeValue: CreateTestDto = {
      ...value,
      picture: images.data.fileNames[0],
      questionCount: questionCount,
      excercises: test?.exercises,
    };
    console.log("data to send:", fakeValue);
    await createTest(fakeValue);
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
        <Form.Item label="Title" name="title" required>
          <Input
            placeholder="Enter the title of the test"
            value={test?.title}
          />
        </Form.Item>
        <Form.Item label="Essay" name="essay" required>
          <Input.TextArea
            rows={4}
            placeholder="Enter the essay"
            value={test?.essay}
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

export default CreateTestPage;
