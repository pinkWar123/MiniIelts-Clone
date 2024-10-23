import { FunctionComponent } from "react";
import ExerciseList from "./ExerciseList";
import AddExercise from "./AddExercise";
import { Button, Form, Input, message } from "antd";
import styles from "./CreateTestPage.module.scss";
import useTest from "../../hooks/useTest";
import {
  CreateListeningPart,
  CreateListeningTestDto,
} from "../../types/Request/listeningTest";
import { createListeningTest } from "../../services/listeningTest";
interface CreateListeningTestPageProps {}
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
const CreateListeningTestPage: FunctionComponent<
  CreateListeningTestPageProps
> = () => {
  const { test } = useTest();
  const handleSubmit = async () => {
    if (!test || !test.exercises) return;
    const questions = test?.exercises.flatMap((e) => e.questions);
    if (!questions || questions.length !== 40)
      message.error("A test must have exactly 40 questions");
    const dto: CreateListeningTestDto = {
      title: "",
      videoId: "",
      listeningParts: [],
    };
    let part = 1;
    while (part <= 4) {
      const exercises = test.exercises.filter(
        (e) =>
          e.startQuestion >= (part - 1) * 10 + 1 && e.endQuestion <= part * 10
      );
      const listeningPart: CreateListeningPart = {
        listeningExercises: exercises,
      };

      dto.listeningParts.push(listeningPart);
      ++part;
    }
    console.log(dto);
    await createListeningTest(dto);
  };
  return (
    <div className={styles["background"]}>
      <Form layout="horizontal" {...formItemLayout}>
        <Form.Item label="Title" required>
          <Input placeholder="Enter title of the test" />
        </Form.Item>
        <Form.Item required label="Video ID">
          <Input placeholder="Enter id of the youtube video" />
        </Form.Item>
        <Form.Item label="Exercise">
          <ExerciseList />
          <AddExercise />
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Create test
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateListeningTestPage;
