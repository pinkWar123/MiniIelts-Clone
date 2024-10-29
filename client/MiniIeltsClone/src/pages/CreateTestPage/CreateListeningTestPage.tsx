import { FunctionComponent, useEffect, useState } from "react";
import ExerciseList from "./ExerciseList";
import AddExercise from "./AddExercise";
import { Button, Form, Input, message } from "antd";
import styles from "./CreateTestPage.module.scss";
import useTest from "../../hooks/useTest";
import {
  CreateListeningPart,
  CreateListeningTestDto,
} from "../../types/Request/listeningTest";
import {
  createListeningTest,
  getListeningTestById,
  updateListeningTestById,
} from "../../services/listeningTest";
import { useNavigate, useParams } from "react-router-dom";
import { MemoizedEditor } from "../AdminPage/Explanation/MemoizedEditor";
interface CreateListeningTestPageProps {
  mode?: "create" | "edit";
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
const CreateListeningTestPage: FunctionComponent<
  CreateListeningTestPageProps
> = ({ mode = "create" }) => {
  const { test, setTest } = useTest();
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState<string>();
  const [transcripts, setTranscripts] = useState<string[]>(["", "", "", ""]);
  useEffect(() => {
    if (mode === "create") return;
    const fetchTest = async () => {
      if (!id) return;
      const res = await getListeningTestById(parseInt(id));
      const data = res.data;
      if (!res.data) return;
      setVideoId(data.videoId);
      setTranscripts(data.listeningParts.map((lp) => lp.transcript));
      setTest({
        id: "0",
        essay: "",
        exercises: data.listeningParts.flatMap((p) => p.listeningExercises),
        title: data.title,
        viewCount: 0,
        questionCount: 40,
      });
    };
    fetchTest();
  }, [id, mode, setTest]);

  const handleSubmit = async () => {
    if (!test || !test.exercises) return;
    const questions = test?.exercises.flatMap((e) => e.questions);
    if (!questions || questions.length !== 40)
      message.error("A test must have exactly 40 questions");
    const dto: CreateListeningTestDto = {
      title: test.title,
      videoId: videoId ?? "",
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
        transcript: transcripts[part - 1],
      };

      dto.listeningParts.push(listeningPart);
      ++part;
    }
    if (mode === "edit" && id) {
      await updateListeningTestById(parseInt(id), dto);
      message.success("Update successfully");
      return;
    }
    await createListeningTest(dto);
    message.success("Create successfully");
    navigate(`/admin/listening-test`);
  };
  return (
    <div className={styles["background"]}>
      <Form layout="horizontal" {...formItemLayout}>
        <Form.Item label="Title" required>
          <Input placeholder="Enter title of the test" value={test?.title} />
        </Form.Item>
        <Form.Item required label="Video ID">
          <Input
            placeholder="Enter id of the youtube video"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Exercise">
          <ExerciseList />
          <AddExercise />
        </Form.Item>

        {Array.from({ length: 4 }, (_, index) => (
          <Form.Item
            key={`transcript-${index}`}
            label={`Transcript for part ${index + 1} `}
          >
            <MemoizedEditor
              editorHtml={transcripts[index]}
              setEditorHtml={(val: string) =>
                setTranscripts((prev) =>
                  prev.map((value, _index) => (_index === index ? val : value))
                )
              }
            />
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Create test
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateListeningTestPage;
