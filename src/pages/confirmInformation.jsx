import react, { useEffect, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import HeaderPage from "../components/headerPage/headerPage";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import ModalConfirm from "../components/modalConfirm/modalConfirm";
import ModalNotification from "../components/modalNotification/modalNotification";
import Store from "../components/redux/store";

const ConfirmInformation = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [customerInformation, setCustomerInformation] = useState(
    Store.getState().customerInformation
  );
  const [staffChosen, setStaffChosen] = useState({});
  const [timePicker, setTimePicker] = useState({});
  const [datePicker, setDatePicker] = useState(Store.getState().datePicker);
  const [branchChosen, setBranchChosen] = useState({});

  useEffect(() => {
    setStaffChosen(() => {
      return Store.getState().users.find(
        (user) => user.id === Store.getState().staffChosen
      );
    });
    setTimePicker(() => {
      return Store.getState().listTimePicker.find((timePicker) => {
        return timePicker.id === Store.getState().timePicker;
      });
    });
    setBranchChosen(() => {
      return Store.getState().branches.find(
        (branch) => branch.id === Store.getState().branchChosen
      );
    });
  }, []);

  const formatDatePicker = (datePicker) => {
    return datePicker.toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    console.log();
  }, [datePicker]);

  return (
    <Box>
      <HeaderPage title="Xác nhận đặt lịch"></HeaderPage>
      <Box
        p={4}
        className="bg-[var(--white-color)] gap-4"
        flex
        flexDirection="column"
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
      <hr className="bg-[var(--text-disable)]" style={{ height: "1px" }}></hr>
      <Box
        className="bg-[var(--white-color)] gap-4"
        flex
        flexDirection="column"
        p={4}
      >
        <Box flex justifyContent="space-between">
          <Text>Ngày đặt</Text>
          <Text className="sub-title">{formatDatePicker(datePicker)}</Text>
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
            <Text>{customerInformation.note}</Text>
          </Box>
        </Box>
      </Box>
      <Box
        className="fixed bottom-0 bg-[var(--white-color)] w-full gap-4"
        flex
        justifyContent="center"
        alignItems="center"
        py={2}
        px={4}
        style={{ boxShadow: "-5px 0px 5px 1px var(--text-disable)" }}
      >
        <ButtonNavigate
          title="Xác nhận"
          style={{ borderRadius: 10 }}
          action={() => setDialogVisible(true)}
        ></ButtonNavigate>
      </Box>
      <ModalConfirm
        title="Xác nhận đặt lịch"
        description="Bạn có chắc chắn đặt lịch không?"
        type="submit"
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        setPopupVisible={setPopupVisible}
      />
      <ModalNotification
        title="Đặt lịch thành công"
        description="Chúng tôi sẽ nhắc bạn trước ngày được đặt. Hẹn gặp bạn tại Garage Thiện Minh!"
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
    </Box>
  );
};

export default ConfirmInformation;
