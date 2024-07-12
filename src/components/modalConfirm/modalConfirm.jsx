import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Box, Modal, Text } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";
import {
  cancelAppointment,
  fetchAllAppointments,
  insertNewAppointment,
} from "../redux/slices/appointmentSlice";

const customerInformation = (state) =>
  state.customerInformation.customerInformation;
const staffChosen = (state) => state.staffChosen.staffChosen;
const timePicker = (state) => state.timeSlotPicker.timeSlotPicker;
const datePicker = (state) => state.datePicker.datePicker;
const branches = (state) => state.branches.branches;
const productsSelected = (state) => state.productsSelected.productsSelected;

const modalConfirmData = createSelector(
  [
    customerInformation,
    timePicker,
    staffChosen,
    datePicker,
    branches,
    productsSelected,
  ],
  (
    customerInformation,
    timePicker,
    staffChosen,
    datePicker,
    branches,
    productsSelected
  ) => ({
    customerInformation: customerInformation,
    timePicker: timePicker,
    staffChosen: staffChosen,
    datePicker: datePicker,
    branches: branches,
    productsSelected: productsSelected,
  })
);

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

  const {
    timePicker,
    productsSelected,
    customerInformation,
    staffChosen,
    datePicker,
  } = useSelector(modalConfirmData);

  // Hàm khi xác nhận thông tin
  const confirmData = async () => {
    if (type === 2) {
      dispatch(cancelAppointment(appointment_id));
      navigate(-1);
      await dispatch(fetchAllAppointments(`${userInfo.id}`));
    }
    if (type === 1) {
      const productsId = productsSelected.map((productSelected) => {
        return productSelected.id;
      });
      const appointmentInserted = {
        zalo_id: userInfo.id,
        branch_id,
        employee_id: staffChosen.id,
        appointment_date: convertDate(datePicker),
        appointment_details: [
          {
            product_id: productsId,
            time_picker_id: timePicker.id,
            customer_name: customerInformation.name,
            customer_email: customerInformation.email,
            customer_address: customerInformation.address,
            customer_phone: customerInformation.phone,
            customer_note: customerInformation.note,
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
