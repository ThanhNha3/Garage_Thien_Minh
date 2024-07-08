import React, { useContext, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import HeaderPage from "../components/headerPage/headerPage";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import ModalConfirm from "../components/modalConfirm/modalConfirm";
import ModalNotification from "../components/modalNotification/modalNotification";
import background from "../../public/images/background.jpg";
import { dataContext } from "../components/providerContext/providerContext";

const ConfirmInformation = () => {
  const { formatTimeSlot } = useContext(dataContext);

  //Lấy branch_id
  const { branch_id } = useParams("branch_id");

  // Set state popup
  const [dialogVisible, setDialogVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  // Lấy dữ liệu từ store
  const customerInformation = useSelector(
    (state) => state.customerInformation.customerInformation
  );
  const staffChosen = useSelector((state) => state.staffChosen.staffChosen);

  const timePicker = useSelector((state) => state.timeSlotPicker.timeSlotPicker);

  const datePicker = useSelector((state) => state.datePicker.datePicker);

  const branches = useSelector((state) => state.branches.branches);

  // Lấy ra branch được đặt
  const branchChosen = branches.find(
    (branch) => branch.id === Number(branch_id)
  );

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
            <img src={branchChosen.image || background}></img>
          </Box>
          <Box>
            <Text className="sub-title">{branchChosen.name}</Text>
            <Text className="text-[var(--text-disable)]">
              {branchChosen.address || "Địa chỉ"}
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
          <Text className="sub-title">{datePicker}</Text>
        </Box>
        <Box flex justifyContent="space-between">
          <Text>Giờ đặt</Text>
          <Text className="sub-title">
            {formatTimeSlot(timePicker.start_time) || "giờ đặt"}
          </Text>
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
        p={4}
        mt={2}
      >
        <Text className="sub-title">Thông tin người đặt</Text>
        <Box flex flexDirection="column" className="gap-2">
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-user-solid"></Icon>
            <Text>{customerInformation.name || "Tên người đặt"}</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-call-solid"></Icon>
            <Text>{customerInformation.phone || "SĐT người đặt"}</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-notif-ring"></Icon>
            <Text>{customerInformation.email || "email người đặt"}</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-location-solid"></Icon>
            <Text>{customerInformation.address || "địa chỉ người đặt"}</Text>
          </Box>
          <Box flex alignItems="center" className="gap-2">
            <Icon icon="zi-post"></Icon>
            <Text>{customerInformation.note || "ghi chú"}</Text>
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
          style={{ borderRadius: 10, background: "var(--primary-color)" }}
          action={() => setDialogVisible(true)}
        ></ButtonNavigate>
      </Box>
      <ModalConfirm
        title="Xác nhận đặt lịch"
        description="Bạn có chắc chắn đặt lịch không?"
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        setPopupVisible={setPopupVisible}
        branch_id={branch_id}
        type={1}
      />
      <ModalNotification
        title="Đặt lịch thành công"
        description="Chúng tôi sẽ nhắc bạn trước ngày được đặt. Hẹn gặp bạn tại Garage Thiện Minh!"
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        type="submit"
        branch_id={branch_id}
      />
    </Box>
  );
};

export default ConfirmInformation;
