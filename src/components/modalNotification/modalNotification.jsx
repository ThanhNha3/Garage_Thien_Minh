import React from "react";
import { Box, Text, Modal, Button, Icon, useNavigate } from "zmp-ui";

const ModalNotification = ({
  title,
  description,
  popupVisible,
  setPopupVisible,
}) => {
  const navigate = useNavigate();
  return (
    <Modal
      visible={popupVisible}
      title={
        <Box flex alignItems="center" justifyContent="center" className="gap-2" pb={5}>
          <Icon
            className="text-[var(--success-color)]"
            icon="zi-check-circle-solid"
          />
          <Text className="sub-title">{title}</Text>
        </Box>
      }
      onClose={() => {
        setPopupVisible(false);
      }}
      verticalActions
      description={description}
    >
      <Box p={6}>
        <Button
          onClick={() => {
            setPopupVisible(false);
            navigate("/");
          }}
          fullWidth
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalNotification;
