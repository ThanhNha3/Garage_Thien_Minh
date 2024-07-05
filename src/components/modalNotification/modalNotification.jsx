import React, { useContext } from "react";
import { Box, Text, Modal, Button, Icon } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";

const ModalNotification = ({
  title,
  description,
  popupVisible,
  setPopupVisible,
  type,
  branch_id,
}) => {
  // Lấy hàm từ context
  const { navigate, dispatch } = useContext(dataContext);
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
        console.log("1");
        setPopupVisible(false);
      }}
      verticalActions
      description={description}
    >
      <Box p={6}>
        <Button
          onClick={() => {
            if (type) {
              switch (type) {
                case "submit": {
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
