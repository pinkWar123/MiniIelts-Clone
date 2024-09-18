import { Button, Form, Input, message } from "antd";
import { FunctionComponent, useState } from "react";
import TestDebounceSelect from "../../../components/DebounceSelect/TestDebounceSelect";
import { CreateFullTestDto } from "../../../types/Request/fullTest";
import { checkNameExistence, createFullTest } from "../../../services/fullTest";

interface CreateFullTestProps {
  onFinish: () => Promise<void>;
}

const CreateFullTest: FunctionComponent<CreateFullTestProps> = ({
  onFinish,
}) => {
  const [form] = Form.useForm<{ title: string; testIds: string[] }>();
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const handleCreateFullTest = async () => {
    console.log(form.getFieldsValue());
    const dto: CreateFullTestDto = {
      title: form.getFieldValue("title"),
      testIds: form.getFieldValue("testIds"),
    };
    setCreateLoading(true);
    await createFullTest(dto);
    message.success("Create full test successfully");
    onFinish();
  };
  return (
    <Form form={form} onFinish={handleCreateFullTest} layout="vertical">
      <Form.Item
        label="Title"
        name={"title"}
        required
        hasFeedback
        validateDebounce={1000}
        rules={[
          () => ({
            async validator(_, value) {
              const res = await checkNameExistence(value);
              if (res.data === true)
                return Promise.reject("Name already exists");
              else return Promise.resolve();
            },
          }),
        ]}
      >
        <Input placeholder="Enter title of full test" />
      </Form.Item>
      <Form.Item
        name={"testIds"}
        label="Tests (required: 3)"
        validateTrigger="onBlur"
        rules={[
          () => ({
            validator(_, value: string[]) {
              if (value.length < 3) return Promise.reject("Require 3 tests!");
              return Promise.resolve();
            },
          }),
        ]}
      >
        <TestDebounceSelect
          onChange={(ids) => {
            form.setFieldValue("testIds", ids);
          }}
        />
      </Form.Item>
      <Button htmlType="submit" loading={createLoading}>
        Create
      </Button>
    </Form>
  );
};

export default CreateFullTest;
