import React, { useState, useEffect, useContext } from "react";
import { Box, Icon, Input, Text } from "zmp-ui";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import HeaderPage from "../components/headerPage/headerPage";
import background from "../../public/images/background.jpg";
import { dataContext } from "../components/providerContext/providerContext";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import ModalConfirm from "../components/modalConfirm/modalConfirm";
import ModalNotification from "../components/modalNotification/modalNotification";
import StatusCard from "../components/cards/statusCard";
import {
  fetchRatingByAppointmentId,
  insertRating,
} from "../components/redux/slices/ratingSlice";
import { insertNewDetailAppointment } from "../components/redux/slices/appointmentDetailSlice";

const DetailsBooking = () => {
  // Lấy id và branch_id
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const branch_id = searchParams.get("branch_id");

  const [dialogVisible, setDialogVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const { formatCurrency, formatDate, dispatch, userInfo } =
    useContext(dataContext);

  //Set state của detailBooking trong trường hợp không có ID
  const [customerInformation, setCustomerInformation] = useState({});
  const [datePicker, setDatePicker] = useState("");
  const [timePicker, setTimePicker] = useState({});
  const [staffChosen, setStaffChosen] = useState({});
  const [branchChosen, setBranchChosen] = useState({});
  const [productsSelected, setProductsSelected] = useState({});

  //Set state của detailBooking trong trường hợp có ID
  const [currentAppointment, setCurrentAppoinment] = useState();

  const [appointmentRatingStatus, setAppointmentRatingStatus] = useState(0); //đánh giá status
  const [ratingStatusSelected, setRatingStatusSelected] = useState(0); //đánh giá status
  const [ratingValue, setRatingValue] = useState({}); //kiểm tra nó có trong cơ sở dữ liệu chưa
  const [readOnly, setReadOnly] = useState(false);

  // Lấy dữ liệu từ store
  const customerInformationFromStore = useSelector(
    (state) => state.customerInformation.customerInformation
  );
  const datePickerFromStore = useSelector(
    (state) => state.datePicker.datePicker
  );
  const timePickerFromStore = useSelector(
    (state) => state.timeSlotPicker.timeSlotPicker
  );
  const staffChosenFromStore = useSelector(
    (state) => state.staffChosen.staffChosen
  );
  const branches = useSelector((state) => state.branches.branches);
  const productsSelectedFromStore = useSelector(
    (state) => state.productsSelected.productsSelected
  );
  const timeslots = useSelector((state) => state.timeSlots.timeSlots);
  const products = useSelector((state) => state.products.products);
  const appointments = useSelector((state) => state.appointments.appointments);
  const staffs = useSelector((state) => state.staffs.staffs);
  const rating = useSelector((state) => state.rating.rating);
  const appointmentDetail = useSelector(
    (state) => state.appointmentDetail.appointment
  );

  useEffect(() => {
    if (id === "null") {
      setCustomerInformation(customerInformationFromStore);
      setDatePicker(datePickerFromStore);
      setTimePicker(timePickerFromStore);
      setStaffChosen(staffChosenFromStore);
      setBranchChosen(() =>
        branches.find((branch) => branch.id === Number(branch_id))
      );
      setProductsSelected(productsSelectedFromStore);
    } else {
      setCurrentAppoinment(
        appointments.find((appointment) => appointment.id === Number(id))
      );
    }
  }, []);

  useEffect(() => {
    if (currentAppointment !== undefined) {
      setBranchChosen(() =>
        branches.find(
          (branch) => branch.id === Number(currentAppointment.branch_id)
        )
      );
      setStaffChosen(() =>
        staffs.find(
          (staff) => staff.id === Number(currentAppointment.employee_id)
        )
      );

      setDatePicker(() => formatDate(currentAppointment.appointment_date));
      dispatch(fetchRatingByAppointmentId(currentAppointment.id));
    }
    if (appointmentDetail && appointmentDetail.id) {
      setCustomerInformation({
        name: appointmentDetail.customer_name,
        phone: appointmentDetail.customer_phone,
        address: appointmentDetail.customer_address,
        note: appointmentDetail.customer_note,
        email: appointmentDetail.customer_email,
      });
      setProductsSelected(() => {
        return products.filter((product) =>
          appointmentDetail.services_id.includes(product.id)
        );
      });
      setTimePicker(() =>
        timeslots.find(
          (timeslot) => timeslot.id === Number(appointmentDetail.time_picker_id)
        )
      );
    }
  }, [currentAppointment, appointmentDetail]);


  useEffect(() => {
    if (rating) {
      setAppointmentRatingStatus(rating.rating_status);
      setRatingValue(rating.rating_value);
      setReadOnly(true);
    } else {
      setReadOnly(false);
      setRatingValue("");
      setAppointmentRatingStatus(ratingStatusSelected);
    }
  }, [rating, ratingStatusSelected]);

  const handleInput = (e) => {
    if (!rating) {
      setRatingValue(e.target.value);
    }
  };

  const sendRating = () => {
    const ratingValue = document.getElementById("customer-rating");

    const data = {
      rating_value: ratingValue.value,
      rating_status: ratingStatusSelected,
      appointment_id: Number(id),
    };
    // dispath API để gửi đánh giá
    dispatch(insertRating(data));
    setPopupVisible(true);
    setReadOnly(true);
  };

  return (
    <Box>
      <HeaderPage title="Phiếu đặt lịch" isBackHome={true}></HeaderPage>
      <Box>
        <Box
          flex
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={2}
          className="bg-[var(--white-color)]"
        >
          <Box>
            {id && id !== "null" ? (
              <Text className="text-[var(--text-disable)]">#{id}</Text>
            ) : (
              ""
            )}
          </Box>
          <StatusCard
            status={currentAppointment && currentAppointment.status}
          />
        </Box>
        <Box
          p={4}
          className="bg-[var(--white-color)] gap-4"
          flex
          flexDirection="column"
          mt={2}
        >
          <Text className="sub-title">Chi tiết đặt lịch</Text>
          <Box flex className="gap-4">
            <Box width={135}>
              <img src={branchChosen.image || background}></img>
            </Box>
            <Box>
              <Text className="sub-title">
                {branchChosen.name || "Tên chi nhánh"}
              </Text>
              <Text className="text-[var(--text-disable)]">
                {branchChosen.address || "địa chỉ chi nhánh"}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          className="bg-[var(--white-color)] gap-4"
          flex
          flexDirection="column"
          p={4}
          mt={2}
        >
          <Box flex justifyContent="space-between">
            <Text>Ngày đặt</Text>
            <Text className="sub-title">{datePicker || "Ngày đặt"}</Text>
          </Box>
          <Box flex justifyContent="space-between">
            <Text>Giờ đặt</Text>
            <Text className="sub-title">{timePicker.time || "Giờ đặt"}</Text>
          </Box>
          <Box flex justifyContent="space-between">
            <Text>Nhân viên</Text>
            <Box flex alignItems="center">
              <Box width={25}>
                <img src={staffChosen.image || background} />
              </Box>
              <Text className="sub-title">
                {staffChosen.name || "tên nhân viên"}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          flex
          flexDirection="column"
          className="gap-2 bg-[var(--white-color)]"
          px={4}
          py={2}
          mt={2}
        >
          <Text className="sub-title">Dịch vụ đã chọn</Text>
          <Box className="gap-2 d-block">
            {productsSelected && productsSelected.length > 0 ? (
              productsSelected.map((item) => (
                <Box
                  key={item.id}
                  flex
                  justifyContent="space-between"
                  alignItems="center"
                  py={2}
                >
                  <Box flex alignItems="center" className="gap-2">
                    <Box width={50} height={50}>
                      <img
                        width={50}
                        className="w-full h-full"
                        src={item.image}
                      />
                    </Box>
                    <Text>{item.name}</Text>
                  </Box>
                  <Box>{formatCurrency(item.price)}</Box>
                </Box>
              ))
            ) : (
              <Box flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-2">
                  <Icon
                    className="text-[var(--secondary-color)]"
                    icon="zi-more-grid-solid"
                  />
                  <Text>Xem tất cả dịch vụ</Text>
                </Box>
                <Icon icon="zi-chevron-right" />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          flex
          flexDirection="column"
          className="gap-2 bg-[var(--white-color)]"
          p={4}
          mt={2}
        >
          <Text className="sub-title">Thông tin người đặt</Text>
          <Box flex flexDirection="column" className="gap-2">
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-user-solid"></Icon>
              <Text>{customerInformation.name || "tên KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-call-solid"></Icon>
              <Text>{customerInformation.phone || "sđt KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-notif-ring"></Icon>
              <Text>{customerInformation.email || "email KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-location-solid"></Icon>
              <Text>{customerInformation.address || "địa chỉ KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-post"></Icon>
              <Text>{customerInformation.note || "ghi chú KH"}</Text>
            </Box>
          </Box>
        </Box>
        {id && currentAppointment && currentAppointment.status === 0 && (
          <Box>
            <Box p={4} mb={10} className="gap-2 bg-[var(--white-color)]" mt={2}>
              <ButtonNavigate
                style={{
                  borderRadius: 10,
                  border: "1px solid red",
                  background: "white",
                  color: "red",
                  fontWeight: "bold",
                }}
                isCancel={true}
                title="Hủy đặt lịch"
                action={() => {
                  setDialogVisible(true);
                }}
              />
            </Box>
            <ModalConfirm
              title="Xác nhận hủy lịch"
              description="Bạn có chắc chắn hủy lịch không?"
              type="submit"
              dialogVisible={dialogVisible}
              setDialogVisible={setDialogVisible}
              setPopupVisible={setPopupVisible}
              type={2}
              appointment_id={currentAppointment.id}
            />
            <ModalNotification
              title="Hủy lịch thành công"
              description="Hẹn gặp bạn vào một dịp khác!"
              popupVisible={popupVisible}
              setPopupVisible={setPopupVisible}
              type="cancel"
            />
          </Box>
        )}
        <Box>
          {currentAppointment && currentAppointment.status === 1 ? (
            <Box
              p={4}
              className="bg-[var(--white-color)] gap-4"
              flex
              flexDirection="column"
              mt={2}
            >
              <Box flex flexDirection="column" className="gap-4">
                <label className="sub-title">Đánh giá dịch vụ</label>
                <Box flex justifyContent="space-between" className="w-full">
                  <Box
                    onClick={() => {
                      if (!readOnly) {
                        setRatingStatusSelected(0);
                      }
                    }}
                    pb={2}
                    className={`text-center flex-1 ${
                      appointmentRatingStatus === 0 ? "rating-active" : ""
                    }`}
                  >
                    Hài lòng
                  </Box>
                  <Box
                    onClick={() => {
                      if (!readOnly) {
                        setRatingStatusSelected(1);
                      }
                    }}
                    pb={2}
                    className={`text-center flex-1 ${
                      appointmentRatingStatus === 1 ? "rating-active" : ""
                    }`}
                  >
                    Không hài lòng
                  </Box>
                </Box>
                <Input.TextArea
                  value={ratingValue}
                  readOnly={readOnly}
                  onChange={handleInput}
                  id="customer-rating"
                  placeholder="đánh giá của bạn..."
                />
                {!readOnly ? (
                  <ButtonNavigate
                    title="Gửi"
                    style={{
                      borderRadius: 10,
                      background: "var(--primary-color)",
                    }}
                    action={sendRating}
                  ></ButtonNavigate>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
      <ModalNotification
        description={"Cảm ơn bạn đã để lại đánh giá"}
        title="Đánh giá thành công"
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
    </Box>
  );
};

export default DetailsBooking;
