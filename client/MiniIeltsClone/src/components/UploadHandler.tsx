import { PlusOutlined } from "@ant-design/icons";
import { Upload, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { FunctionComponent } from "react";

interface UploadHandlerProps {
  props: UploadProps<unknown>;
  onPreview: (file: UploadFile) => Promise<void>;
}

const UploadHandler: FunctionComponent<UploadHandlerProps> = ({
  props,
  onPreview,
}) => {
  return (
    <ImgCrop zoomSlider aspect={100 / 150} quality={0.9} aspectSlider={true}>
      <Upload
        listType="picture-card"
        {...props}
        onPreview={onPreview}
        maxCount={1}
      >
        <button
          style={{ border: 0, background: "none" }}
          type="button"
          disabled={props.fileList && props.fileList?.length > 0}
        >
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
    </ImgCrop>
  );
  ``;
};

export default UploadHandler;
