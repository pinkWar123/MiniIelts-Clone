import { SendOutlined } from "@ant-design/icons";
import { FunctionComponent } from "react";
import styles from "./Buttons.module.scss";
import { Button } from "antd";
interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ onClick }) => {
  return (
    <div className={styles["btn-wrapper"]}>
      <Button
        icon={<SendOutlined />}
        className={styles["submit-btn"]}
        onClick={onClick}
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitButton;
