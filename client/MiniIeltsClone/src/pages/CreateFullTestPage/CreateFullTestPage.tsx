import { Form, Input } from "antd";
import { FunctionComponent, useState } from "react";
import TestDebounceSelect from "../../components/DebounceSelect/TestDebounceSelect";

interface CreateFullTestPageProps {}

const CreateFullTestPage: FunctionComponent<CreateFullTestPageProps> = () => {
  const [testIds, setTestIds] = useState<string[]>([]);
  console.log(testIds);
  return (
    <Form>
      <Form.Item label="Title" required>
        <Input placeholder="Enter title of full test" />
      </Form.Item>
      <Form.Item>
        <TestDebounceSelect onChange={(ids) => setTestIds(ids)} />
      </Form.Item>
    </Form>
  );
};

export default CreateFullTestPage;
