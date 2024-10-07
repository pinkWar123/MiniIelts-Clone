import { FunctionComponent } from "react";
import styles from "./UrlBox.module.scss";
import { Button, Flex, message, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
interface UrlBoxProps {}

const UrlBox: FunctionComponent<UrlBoxProps> = () => {
  return (
    <div className={styles["share-score-wrapper"]}>
      <Flex className={styles["title"]} justify="center">
        Share your score
      </Flex>
      <div className={styles["url-box"]}>
        <a
          href={window.location.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {window.location.href}
        </a>
      </div>
      <Flex justify="center">
        <Tooltip title="Copy link">
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              const textToCopy = window.location.href;
              navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                  message.success("Copy to clipboard!");
                })
                .catch(() => {
                  message.error("Failed to copy to clipboard");
                });
            }}
          >
            Copy
          </Button>
        </Tooltip>
      </Flex>
    </div>
  );
};

export default UrlBox;
