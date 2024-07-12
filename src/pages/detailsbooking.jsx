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
import { insertRating } from "../components/redux/slices/ratingSlice";
import { createSelector } from "reselect";

const customerInformation = (state) =>
  state.customerInformation.customerInformation;
const staffChosen = (state) => state.staffChosen.staffChosen;
const timePicker = (state) => state.timeSlotPicker.timeSlotPicker;
const datePicker = (state) => state.datePicker.datePicker;
const branches = (state) => state.branches.branches;
const productsSelected = (state) => state.productsSelected.productsSelected;
const appointmentDetail = (state) => state.appointmentDetail.appointment;
const staffs = (state) => state.staffs.staffs;
const timeSlots = (state) => state.timeSlots.timeSlots;
const products = (state) => state.products.products;

const detailsBookingData = createSelector(
  [
    customerInformation,
    timePicker,
    staffChosen,
    datePicker,
    branches,
    productsSelected,
    appointmentDetail,
    staffs,
    timeSlots,
    products,
  ],
  (
    customerInformation,
    timePicker,
    staffChosen,
    datePicker,
    branches,
    productsSelected,
    appointmentDetail,
    staffs,
    timeSlots,
    products
  ) => ({
    customerInformation: customerInformation,
    timePicker: timePicker,
    staffChosen: staffChosen,
    datePicker: datePicker,
    branches: branches,
    productsSelected: productsSelected,
    appointmentDetail: appointmentDetail,
    staffs: staffs,
    timeSlots: timeSlots,
    products: products,
  })
);

const DetailsBooking = () => {
  // Lấy id và branch_id
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [hasId, setHasId] = useState(false);

  const branch_id = searchParams.get("branch_id");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const { formatCurrency, formatDate, dispatch, formatTimeSlot } =
    useContext(dataContext);

  // Bắt đầu logic mới
  const [user, setUser] = useState({});
  const [staff, setStaff] = useState({});
  const [dateAppoinment, setDateAppointment] = useState("");
  const [time, setTime] = useState("");
  const [branch, setBranch] = useState({});
  const [listProducts, setListProducts] = useState([]);

  const {
    customerInformation,
    staffChosen,
    timePicker,
    datePicker,
    branches,
    productsSelected,
    appointmentDetail,
    staffs,
    timeSlots,
    products,
  } = useSelector(detailsBookingData);

  useEffect(() => {
    if (id === "null") {
      setHasId(false);
      setUser(customerInformation);
      setStaff(staffChosen);
      setDateAppointment(datePicker);
      setTime(timePicker);
      setBranch(() => {
        return branches.find((branch) => {
          return branch.id === Number(branch_id);
        });
      });
      setListProducts(productsSelected);
    } else {
      setUser({
        name: appointmentDetail.customer_name,
        email: appointmentDetail.customer_email,
        address: appointmentDetail.customer_address,
        phone: appointmentDetail.customer_phone,
        note: appointmentDetail.customer_note,
      });
      setTime(() => {
        return timeSlots.find((timeSlot) => {
          return timeSlot.id === Number(appointmentDetail.time_picker_id);
        });
      });
      setHasId(true);
    }
  }, []);

  // Kết thúc logic mới
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
            <Text className="text-[var(--text-disable)]">{`${
              hasId ? `#${id}` : ""
            }`}</Text>
          </Box>
          <StatusCard status={0} />
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
              <img src={branch.image || background}></img>
            </Box>
            <Box>
              <Text className="sub-title">
                {branch.name || "Tên chi nhánh"}
              </Text>
              <Text className="text-[var(--text-disable)]">
                {branch.address || "địa chỉ chi nhánh"}
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
            <Text className="sub-title">{dateAppoinment || "Ngày đặt"}</Text>
          </Box>
          <Box flex justifyContent="space-between">
            <Text>Giờ đặt</Text>
            <Text className="sub-title">
              {formatTimeSlot(time.start_time) || "Giờ đặt"}
            </Text>
          </Box>
          <Box flex justifyContent="space-between">
            <Text>Nhân viên</Text>
            <Box flex alignItems="center">
              <Box width={25}>
                <img src={staff.image || background} />
              </Box>
              <Text className="sub-title">{staff.name || "tên nhân viên"}</Text>
            </Box>
          </Box>
        </Box>
        <Box
          flex
          flexDirection="column"
          className="gap-2 bg-[var(--white-color)]"
          p={4}
        >
          <Text.Title className="sub-title">Dịch vụ đã chọn</Text.Title>
          <Box className="gap-2 d-block">
            {listProducts && listProducts.length > 0 ? (
              listProducts.map((item) => (
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
                        src={item.image}
                        className="w-full h-full"
                        alt="Product"
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
              <Text>{user.name || "tên KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-call-solid"></Icon>
              <Text>{user.phone || "sđt KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-notif-ring"></Icon>
              <Text>{user.email || "email KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-location-solid"></Icon>
              <Text>{user.address || "địa chỉ KH"}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-post"></Icon>
              <Text>{user.note || "ghi chú KH"}</Text>
            </Box>
          </Box>
        </Box>
        <Box>
          {hasId && (
            <Box>
              <Box
                p={4}
                mb={10}
                className="gap-2 bg-[var(--white-color)]"
                mt={2}
              >
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
                appointment_id={id}
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
        </Box>
        <Box>
          {hasId && (
            <Box
              p={4}
              className="bg-[var(--white-color)] gap-4"
              flex
              flexDirection="column"
              mt={2}
            >
              <Box flex flexDirection="column" className="gap-4">
                <label className="sub-title">Đánh giá dịch vụ</label>
                <Box flex justifyContent="space-around" className="w-full">
                  <Box onClick={() => {}} p={2}>
                    Hài lòng
                  </Box>
                  <Box onClick={() => {}} p={2}>
                    Không hài lòng
                  </Box>
                </Box>
                <Input.TextArea
                  id="customer-rating"
                  placeholder="đánh giá của bạn..."
                />
                <ButtonNavigate
                  title="Gửi"
                  style={{
                    borderRadius: 10,
                    background: "var(--primary-color)",
                  }}
                  action={sendRating}
                ></ButtonNavigate>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <ModalNotification
        description={"Cảm ơn bạn đã để lại đánh giá"}
        title="Đánh giá thành công"
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        type="send-rating"
      />
    </Box>
  );
};

export default DetailsBooking;
