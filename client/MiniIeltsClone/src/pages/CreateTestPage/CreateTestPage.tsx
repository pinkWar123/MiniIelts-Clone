import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Upload } from "antd";
import { FunctionComponent } from "react";
import styles from "./CreateTestPage.module.scss";
import AddExercise from "./AddExercise";
import useTest from "../../hooks/useTest";
import ExerciseList from "./ExerciseList";
import { createTest } from "../../services/test";
import { CreateTestDto } from "../../types/Request/Test";
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
  const handleSubmit = async (value) => {
    console.log(value);
    console.log("exercises:", test?.exercises);
    const fakeValue: CreateTestDto = {
      ...value,
      picture: "empty picture",
      questionCount: 13,
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
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
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
