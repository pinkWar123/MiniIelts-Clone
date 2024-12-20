import { Form, Input, message, Modal } from "antd";
import { FunctionComponent, useState } from "react";
import { useUpload } from "../../../hooks/useUpload";
import UploadHandler from "../../../components/UploadHandler";
import FullTestDebounceSelect from "../../../components/DebounceSelect/FullTestDebounceSelect";
import { CreateSeriesDto } from "../../../types/Request/series";
import { createNewSeries } from "../../../services/series";
import ListeningTestDebounceSelect from "../../../components/DebounceSelect/ListeningDebounceSelect";

interface CreateSeriesModalProps {
  onClose: () => void;
  fetchSeries: () => Promise<void>;
}

const CreateSeriesModal: FunctionComponent<CreateSeriesModalProps> = ({
  onClose,
  fetchSeries,
}) => {
  const { handleUpload, props, onPreview, fileList } = useUpload();
  const [form] = Form.useForm<CreateSeriesDto>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    const dto: CreateSeriesDto = {
      title: form.getFieldValue("title"),
      fullTestIds: form.getFieldValue("fullTestIds"),
      listeningTestIds: form.getFieldValue("listeningTestIds"),
    };
    setSubmitLoading(true);
    try {
      if (fileList && fileList.length > 0) {
        const images = await handleUpload("series");
        dto.image = images.data.fileNames[0];
      }
      await createNewSeries(dto);
      await fetchSeries();
      setSubmitLoading(false);
      onClose();
      message.success("Create series successfully");
    } catch (error) {
      setSubmitLoading(false);
    }
  };
  return (
    <Modal
      open={true}
      onClose={onClose}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={submitLoading}
      centered
    >
      <Form form={form}>
        <Form.Item label="Image">
          <UploadHandler onPreview={onPreview} props={props} />
        </Form.Item>
        <Form.Item label="Title" required name={"title"}>
          <Input placeholder="Title of series..." />
        </Form.Item>
        <Form.Item name={"fullTestIds"} label="Full Tests">
          <FullTestDebounceSelect
            onChange={(dtos) =>
              form.setFieldValue(
                "fullTestIds",
                dtos.map((dto) => dto.id)
              )
            }
          />
        </Form.Item>
        <Form.Item name={"listeningTestIds"} label="Listening Tests">
          <ListeningTestDebounceSelect
            onChange={(dtos) =>
              form.setFieldValue(
                "listeningTestIds",
                dtos.map((dto) => dto.id)
              )
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSeriesModal;
