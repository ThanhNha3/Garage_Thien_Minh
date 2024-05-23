import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Icon, Input, Text } from "zmp-ui";
import HeaderPage from "../components/headerPage/headerPage";
import { dataContext } from "../components/providerContext/providerContext";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import ModalConfirm from "../components/modalConfirm/modalConfirm";
import ModalNotification from "../components/modalNotification/modalNotification";
import { useParams } from "react-router";
import Store from "../components/redux/store";
import StatusCard from "../components/cards/statusCard";

const DetailsBooking = () => {
  const { id } = useParams();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const { formatCurrency, formatDatePicker } = useContext(dataContext);

  // Dữ liệu đánh giá
  const [rating, setRating] = useState(0);

  //Dữ liệu của detailBooking trong trường hợp không có ID
  const [customerInformation, setCustomerInformation] = useState({});
  const [currentAppointment, setCurrentAppoinment] = useState({});
  const [datePicker, setDatePicker] = useState("");
  const [listServices, setListServices] = useState([]);
  const [staffChosen, setStaffChosen] = useState({});
  const [timePicker, setTimePicker] = useState({});
  const [branchChosen, setBranchChosen] = useState({});
  const [note, setNote] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [appointmentHasRating, setAppointmentHasRating] = useState({});

  useEffect(() => {
    if (!id) {
      setListServices(() => {
        return Store.getState().productsSelected;
      });
      setCustomerInformation(() => {
        return Store.getState().customerInformation;
      });
      setDatePicker(() => {
        return formatDatePicker(new Date(Store.getState().datePicker));
      });
      setBranchChosen(() => {
        return Store.getState().branches.find(
          (branch) => branch.id === Store.getState().branchChosen
        );
      });
      setTimePicker(() => {
        return Store.getState().listTimePicker.find((timePicker) => {
          return timePicker.id === Store.getState().timePicker;
        });
      });
      setStaffChosen(() => {
        return Store.getState().users.find(
          (user) => user.id === Store.getState().staffChosen
        );
      });
    } else {
      const currentAppoinment = Store.getState().appointments.find(
        (appointment) => appointment.id === Number(id)
      );
      setCurrentAppoinment(currentAppoinment);

      setCustomerInformation(() => {
        return Store.getState().users.find(
          (user) => user.id === currentAppoinment.customer_id
        );
      });
      setListServices(() => {
        return Store.getState().products.filter((product) =>
          currentAppoinment.services_id.includes(product.id)
        );
      });
      setDatePicker(() => {
        return currentAppoinment.appointment_date;
      });
      setBranchChosen(() => {
        return Store.getState().branches.find(
          (branch) => branch.id === currentAppoinment.branch_id
        );
      });
      setTimePicker(() => {
        return Store.getState().listTimePicker.find((timePicker) => {
          return timePicker.id === currentAppoinment.time_picker_id;
        });
      });
      setStaffChosen(() => {
        return Store.getState().users.find(
          (user) => user.id === currentAppoinment.employee_id
        );
      });
      setNote(currentAppoinment.note);
    }
  }, []);

  useEffect(() => {
    const appointmentCompleted = Store.getState().ratings.find(
      (rating) => rating.appointment_id === Number(id)
    );

    if (appointmentCompleted) {
      setAppointmentHasRating(appointmentCompleted);
      setRating(appointmentCompleted.rating_status);
      setShowRating(true);
    }
  }, [rating]);

  const sendRating = () => {
    const ratingValue = document.getElementById("customer-rating");
    const data = {
      note: ratingValue.value,
      rating,
      appointment_id: Number(id),
    };
    // Call API để gửi đánh giá
    setPopupVisible(true);
    setShowRating(true);
  };

  //Kết thúc dữ liệu của detailBooking trong trường hợp không có ID

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
            {id ? (
              <Text className="text-[var(--text-disable)]">#{id}</Text>
            ) : (
              ""
            )}
          </Box>
          <StatusCard status={currentAppointment.status} />
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
              <img src={branchChosen.image}></img>
            </Box>
            <Box>
              <Text className="sub-title">{branchChosen.name}</Text>
              <Text className="text-[var(--text-disable)]">
                {branchChosen.address}
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
            <Text className="sub-title">{datePicker}</Text>
          </Box>
          <Box flex justifyContent="space-between">
            <Text>Giờ đặt</Text>
            <Text className="sub-title">{timePicker.time}</Text>
          </Box>
          <Box flex justifyContent="space-between">
            <Text>Nhân viên</Text>
            <Box flex alignItems="center">
              <Box width={25}>
                <img src={staffChosen.image} />
              </Box>
              <Text className="sub-title">{staffChosen.name}</Text>
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
            {listServices.length > 0 ? (
              listServices.map((item) => (
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
              <Text>{customerInformation.name}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-call-solid"></Icon>
              <Text>{customerInformation.phone}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-notif-ring"></Icon>
              <Text>{customerInformation.email}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-location-solid"></Icon>
              <Text>{customerInformation.address}</Text>
            </Box>
            <Box flex alignItems="center" className="gap-2">
              <Icon icon="zi-post"></Icon>
              <Text>{customerInformation.note || note}</Text>
            </Box>
          </Box>
        </Box>
        {id && currentAppointment.status === 0 && (
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
                action={() => setDialogVisible(true)}
              />
            </Box>
            <ModalConfirm
              title="Xác nhận hủy lịch"
              description="Bạn có chắc chắn hủy lịch không?"
              type="submit"
              dialogVisible={dialogVisible}
              setDialogVisible={setDialogVisible}
              setPopupVisible={setPopupVisible}
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
          {currentAppointment.status === 1 ? (
            !showRating ? (
              // Phần này sẽ được hiển thị nếu currentAppointment.status === 1 và showRating === false
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
                      onClick={() => setRating(0)}
                      pb={2}
                      className={`text-center flex-1 ${
                        rating === 0 ? "rating-active" : ""
                      }`}
                    >
                      Hài lòng
                    </Box>
                    <Box
                      onClick={() => setRating(1)}
                      pb={2}
                      className={`text-center flex-1 ${
                        rating === 1 ? "rating-active" : ""
                      }`}
                    >
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
            ) : (
              // Phần này sẽ được hiển thị nếu currentAppointment.status === 1 và showRating === true
              <Box>
                <Box
                  p={4}
                  className="bg-[var(--white-color)] gap-4"
                  flex
                  flexDirection="column"
                  mt={2}
                >
                  <Box flex flexDirection="column" className="gap-4">
                    <label className="sub-title">Bạn đã đánh giá</label>
                    <Box flex justifyContent="space-between" className="w-full">
                      <Box
                        pb={2}
                        className={`text-center flex-1 ${
                          rating === 0 ? "rating-active" : ""
                        }`}
                      >
                        Hài lòng
                      </Box>
                      <Box
                        pb={2}
                        className={`text-center flex-1 ${
                          rating === 1 ? "rating-active" : ""
                        }`}
                      >
                        Không hài lòng
                      </Box>
                    </Box>
                    <Input.TextArea value={appointmentHasRating.rating_value} />
                  </Box>
                </Box>
                <ModalNotification
                  description={"Cảm ơn bạn đã để lại đánh giá"}
                  title="Đánh giá thành công"
                  popupVisible={popupVisible}
                  setPopupVisible={setPopupVisible}
                />
              </Box>
            )
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsBooking;
