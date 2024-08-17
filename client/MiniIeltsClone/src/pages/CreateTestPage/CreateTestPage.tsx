import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Typography,
  Upload,
  GetProp,
  UploadFile,
  UploadProps,
} from "antd";
import { FunctionComponent, useState } from "react";
import styles from "./CreateTestPage.module.scss";
import AddExercise from "./AddExercise";
import useTest from "../../hooks/useTest";
import ExerciseList from "./ExerciseList";
import { createTest } from "../../services/test";
import { CreateTestDto } from "../../types/Request/Test";
import { uploadFiles } from "../../services/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleUpload = async () => {
    console.log(fileList);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file as FileType);
    });
    await uploadFiles(formData);
    return fileList?.map(
      (file) =>
        `https://miniieltsbypinkwar.blob.core.windows.net/apiimages/${file.fileName}`
    );
  };
  const handleSubmit = async (value) => {
    console.log(value);
    const images = await handleUpload();
    console.log("exercises:", test?.exercises);
    const questionCount = test?.exercises
      .map((e) => e.questionCount)
      .reduce((sum, val) => sum + val, 0);
    const fakeValue: CreateTestDto = {
      ...value,
      picture: images[0],
      questionCount: questionCount,
      excercises: test?.exercises,
    };
    console.log("data to send:", fakeValue);
    const res = await createTest(fakeValue);
    console.log(res);
  };
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
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
          <Upload listType="picture-card" maxCount={1} {...props}>
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
