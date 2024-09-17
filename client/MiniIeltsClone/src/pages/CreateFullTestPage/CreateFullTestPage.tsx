import { Form, Input } from "antd";
import { FunctionComponent, useState } from "react";
import UploadHandler from "../../components/UploadHandler";
import { useUpload } from "../../hooks/useUpload";
import TestDebounceSelect from "../../components/DebounceSelect/TestDebounceSelect";

interface CreateFullTestPageProps {}

const CreateFullTestPage: FunctionComponent<CreateFullTestPageProps> = () => {
  const props = useUpload();
  const [testIds, setTestIds] = useState<string[]>([]);
  console.log(testIds);
  return (
    <Form>
      <Form.Item label="Image">
        <UploadHandler {...props} />
      </Form.Item>
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
