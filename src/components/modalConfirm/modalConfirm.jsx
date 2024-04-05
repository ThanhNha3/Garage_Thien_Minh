import React from "react";
import { Box, Modal, Text } from "zmp-ui";

const ModalConfirm = ({
  title,
  description,
  type,
  dialogVisible,
  setDialogVisible,
  setPopupVisible,
}) => {
  const confirmData = () => {
    setDialogVisible(false);
    setPopupVisible(true);
  };

  return (
    <Modal
      visible={dialogVisible}
      title={
        <Box flex justifyContent="flex-start" className="gap-2">
          <Text className="sub-title">{title}</Text>
        </Box>
      }
      onClose={() => {
        setDialogVisible(false);
      }}
      onClick={() => console.log(1)}
      actions={[
        {
          text: "Hủy",
          close: true,
        },
        {
          text: "Xác nhận",
          highLight: true,
          onClick: confirmData,
        },
      ]}
      description={description}
    ></Modal>
  );
};
export default ModalConfirm;
