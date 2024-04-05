import react, { useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import HeaderPage from "../components/headerPage/headerPage";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import ModalConfirm from "../components/modalConfirm/modalConfirm";
import ModalNotification from "../components/modalNotification/modalNotification";

const ConfirmInformation = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
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
            <img src="https://vietbooking.net/wp-content/uploads/2021/04/Can-tho-3-thienphuoctravel.com_-1.jpg"></img>
          </Box>
          <Box>
            <Text className="sub-title">Garage Thiện Minh</Text>
            <Text className="text-[var(--text-disable)]">
              Thành phố cần thơ
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
          <Text className="sub-title">Ngày đặt</Text>
        </Box>
        <Box flex justifyContent="space-between">
          <Text>Giờ đặt</Text>
          <Text className="sub-title">Giờ đặt</Text>
        </Box>
        <Box flex justifyContent="space-between">
          <Text>Nhân viên</Text>
          <Box flex alignItems="center">
            <Box width={25}>
              <img src="https://th.bing.com/th/id/R.425d708a625a73a8bafdcf3a7349f565?rik=gE0x6lkfGE35Ug&pid=ImgRaw&r=0" />
            </Box>
            <Text className="sub-title">Mặc định</Text>
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
            <Text>Thanh Nhả</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-call-solid"></Icon>
            <Text>0946630197</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-notif-ring"></Icon>
            <Text>nhantpc05188@fpt.edu.vn</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-location-solid"></Icon>
            <Text>Cần Thơ</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-post"></Icon>
            <Text>Sẽ lấy trong 2 ngày</Text>
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
