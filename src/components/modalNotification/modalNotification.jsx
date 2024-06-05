import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Box, Text, Modal, Button, Icon, useNavigate } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import { insertNewAppointment } from "../redux/slices/appointmentSlice";

const ModalNotification = ({
  title,
  description,
  popupVisible,
  setPopupVisible,
  type,
  branch_id,
}) => {
  const { navigate } = useContext(dataContext);
  if (type === "submit") {

  }
  return (
    <Modal
      visible={popupVisible}
      title={
        <Box
          flex
          alignItems="center"
          justifyContent="center"
          className="gap-2"
          pb={5}
        >
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
            if (type) {
              switch (type) {
                case "submit": {
                
                  // bắn dispatch tại đây
                  // Phần id này sẽ được gọi từ database
                  navigate(`/detailsBooking?id=null&&branch_id=${branch_id}`);
                  break;
                }
                case "cancel": {
                  navigate("/");
                  break;
                }
                default: {
                  navigate("/");
                  break;
                }
              }
            }
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
