import { Form, Input, message, Modal } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import UploadHandler from "../../../components/UploadHandler";
import { useUpload } from "../../../hooks/useUpload";
import { getSeriesById, updateSeries } from "../../../services/series";
import {
  FullTestNameDto,
  SeriesViewDto,
} from "../../../types/Responses/series";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TestList from "./TestList";
import { UpdateSeriesDto } from "../../../types/Request/series";

interface UpdateSeriesModalProps {
  onClose: () => void;
  id: number;
  fetchSeries: () => Promise<void>;
}

const UpdateSeriesModal: FunctionComponent<UpdateSeriesModalProps> = ({
  onClose,
  id,
  fetchSeries,
}) => {
  const { onPreview, props, setFileList, fileList, handleUpload } = useUpload();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<SeriesViewDto>();
  useEffect(() => {
    const fetchSeries = async () => {
      const res = await getSeriesById(id);
      if (!res.data) {
        message.error("Series not found!");
        onClose();
        return;
      }
      setSeries(res.data);
      if (res.data.image)
        setFileList([
          {
            uid: "-1",
            name: "original",
            url: res.data.image,
          },
        ]);
    };
    fetchSeries();
  }, [id, onClose, setFileList]);

  const setTests = useCallback((tests: FullTestNameDto[]) => {
    setSeries((prev) => {
      if (!prev) return prev;
      return { ...prev, tests };
    });
  }, []);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      let fileName: string = "";
      if (fileList.length === 1) {
        console.log(fileList);
        if (fileList[0].uid === "-1") fileName = fileList[0].url ?? "";
        else {
          alert("Upload");
          const image = await handleUpload("series");
          if (image.data) {
            fileName = image.data.fileNames[0];
          }
        }
      }

      const dto: UpdateSeriesDto = {
        title: series?.title ?? "",
        fullTestIds: series?.tests.map((t) => t.id.toString()) ?? [],
        image: fileName,
      };

      await updateSeries(id, dto);
      await fetchSeries();
      setSubmitLoading(false);
      onClose();
      message.success("Update series succesfully");
    } catch (error) {
      onClose();
      console.log(error);
      message.error("Update series failed");
    }
  };

  const removeTest = useCallback(
    (index: number) => {
      if (!series?.tests) return;
      const newTests = [...series.tests];
      newTests.splice(index, 1);
      setTests(newTests);
    },
    [series?.tests, setTests]
  );

  return (
    <Modal
      open={true}
      onClose={onClose}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={submitLoading}
      centered
    >
      <Form layout="vertical">
        <Form.Item label="Image">
          <UploadHandler onPreview={onPreview} props={props} />
        </Form.Item>
        <Form.Item label="Title" required>
          <Input
            placeholder="Title of series..."
            value={series?.title}
            onChange={(e) =>
              setSeries((prev) =>
                prev ? { ...prev, title: e.target.value } : prev
              )
            }
          />
        </Form.Item>
        <Form.Item name={"tests"} label="Full Tests">
          <DndProvider backend={HTML5Backend}>
            <TestList
              tests={series?.tests ?? []}
              setTests={setTests}
              removeTest={removeTest}
            />
          </DndProvider>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSeriesModal;
