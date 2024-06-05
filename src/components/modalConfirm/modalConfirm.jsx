import React, { useContext } from "react";
import { Box, Modal, Text } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import { cancelAppointment } from "../redux/slices/appointmentSlice";

const ModalConfirm = ({
  title,
  description,
  type,
  dialogVisible,
  setDialogVisible,
  setPopupVisible,
  appointment_id,
  action,
}) => {
  const { dispatch, navigate } = useContext(dataContext);
  const confirmData = () => {
    if (type === 2) {
      dispatch(cancelAppointment(appointment_id));
      navigate(-1);
    }
    // Gọi API tại đây để thêm dữ liệu vào Database
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
