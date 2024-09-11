import { Button, Form, Input, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./CreateTestPage.module.scss";
import AddExercise from "./AddExercise";
import useTest from "../../hooks/useTest";
import ExerciseList from "./ExerciseList";
import { createTest } from "../../services/test";
import { CreateTestDto } from "../../types/Request/Test";
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
  const { test } = useTest();
  const { handleUpload, props, onPreview } = useUpload();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (value: any) => {
    console.log(value);
    const images = await handleUpload();
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
    const res = await createTest(fakeValue);
    console.log(res);
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
          <Input placeholder="Enter the title of the test" />
        </Form.Item>
        <Form.Item label="Essay" name="essay" required>
          <Input.TextArea rows={4} placeholder="Enter the essay" />
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
