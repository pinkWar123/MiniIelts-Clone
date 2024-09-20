import { Button, Flex, Modal, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import LoginForm from "./LoginForm";

interface AskLoginModalProps {
  open: boolean;
  onSuccess: () => void;
}

const AskLoginModal: FunctionComponent<AskLoginModalProps> = ({
  open,
  onSuccess,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(open);
  return (
    <Modal
      open={openModal}
      footer={null}
      maskClosable={false}
      closeIcon={false}
      title={
        <Flex justify="center">
          <Typography.Title level={4}>Please log in!</Typography.Title>
        </Flex>
      }
    >
      <Flex justify="center" style={{ paddingBottom: "20px" }}>
        Login to save the results of your tests and keep track of your progress!
      </Flex>
      <LoginForm
        onSuccess={() => {
          onSuccess();
          setOpenModal(false);
        }}
      />
      <Button
        style={{ width: "100%", marginTop: "-20px" }}
        danger
        onClick={() => {
          onSuccess();
          setOpenModal(false);
        }}
      >
        Take the test without logging in
      </Button>
    </Modal>
  );
};

export default AskLoginModal;
