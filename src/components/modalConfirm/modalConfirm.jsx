import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Box, Modal, Text } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import {
  cancelAppointment,
  insertNewAppointment,
} from "../redux/slices/appointmentSlice";

const ModalConfirm = ({
  title,
  description,
  type,
  dialogVisible,
  setDialogVisible,
  setPopupVisible,
  appointment_id,
  branch_id,
}) => {
  // Lấy hàm từ dataContext
  const { dispatch, navigate, userInfo, convertDate } = useContext(dataContext);

  // Lấy dữ liệu từ store
  const timePicker = useSelector(
    (state) => state.timeSlotPicker.timeSlotPicker
  );

  const productsSelected = useSelector(
    (state) => state.productsSelected.productsSelected
  );
  
  const customerInformation = useSelector(
    (state) => state.customerInformation.customerInformation
  );

  const staffChosen = useSelector((state) => state.staffChosen.staffChosen);
  const datePicker = convertDate(
    useSelector((state) => state.datePicker.datePicker)
  );

  // Hàm khi xác nhận thông tin
  const confirmData = () => {
    if (type === 2) {
      dispatch(cancelAppointment(appointment_id));
      navigate(-1);
    }
    if (type === 1) {
      const productsId = productsSelected.map((productSelected) => {
        return productSelected.id;
      });
      const appointmentInserted = {
        zalo_id: userInfo.id,
        branch_id,
        employee_id: staffChosen.id,
        appointment_date: datePicker,
        appointment_details: [
          {
            product_id: productsId,
            time_picker_id:timePicker.id,
            customer_name:customerInformation.name,
            customer_email:customerInformation.email,
            customer_address:customerInformation.address,
            customer_phone:customerInformation.phone,
            customer_note:customerInformation.note
          },
        ],
      };
      dispatch(insertNewAppointment(appointmentInserted));
    }
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
