import React, { useContext, useEffect, useState } from "react";
import { Box, Icon, Text, useNavigate, DatePicker } from "zmp-ui";
import { useParams } from "react-router";
import { openChat } from "zmp-sdk/apis";

import Store from "../components/redux/store";
import { dataContext } from "../components/providerContext/providerContext";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import HeaderPage from "../components/headerPage/headerPage";
import { useSelector } from "react-redux";
import { fetchAllBranches } from "../components/redux/slices/branchSlide";
import { ChangeDatePicker } from "../components/redux/actions/datePickerAction";
import background from "../../public/images/background.jpg";
import TimeSlot from "../components/timeSlot/timeSlot";
import { fetchAllStaffs } from "../components/redux/slices/staffSlide";
import {changeStaffChosen} from "../components/redux/slices/staffChosenSlide"

const CreateBooking = () => {
  // Lấy các hàm từ dataContext
  const { navigate, dispatch, formatCurrency } = useContext(dataContext);

  // Lấy branch_id
  const { branch_id } = useParams("branch_id");

  // Dispatch
  useEffect(() => {
    dispatch(fetchAllBranches());
  }, []);
  useEffect(() => {
    dispatch(fetchAllStaffs());
  }, []);

  // Lấy dữ liệu từ store
  const listBranches = useSelector((state) => state.branches.branches);
  const productsSelected = useSelector(
    (store) => store.productsSelected.productsSelected
  );
  const staffs = useSelector((store) => store.staffs.staffs);
  const datePicker = useSelector((store) => store.datePicker.datePicker);

  // Đặt state cho chính nhánh, danh sách nhân viên, danh sách dịch vụ
  const [currentBranch, setCurrentBranch] = useState(Store);
  const [staffsByBranchId, setStaffsByBranchId] = useState([]);
  const [listServices] = useState(productsSelected);
  const [date, setDate] = useState(new Date(datePicker));

  useEffect(() => {
    setStaffsByBranchId(() => {
      return staffs.filter((staff) => staff.branch_id === Number(branch_id));
    });
  }, [branch_id]);

  const [staffIdChosen, setStaffIdChosen] = useState();

  useEffect(() => {
    setCurrentBranch(() => {
      return listBranches.find((branch) => branch.id === Number(branch_id));
    });
  }, [listBranches, dispatch]);

  useEffect(() => {
    dispatch(ChangeDatePicker(date));
  }, [date]);

  const handleDatePicker = (date) => {
    setDate(date);
  };

  const openChatScreen = async () => {
    try {
      await openChat({
        type: "oa",
        id: "user-id",
        message: "Xin Chào",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="bg-[var(--background-grey)]">
      <HeaderPage title="Tạo lịch hẹn" />
      <Box
        py={4}
        flex
        flexDirection="column"
        className="gap-2 bg-[var(--white-color)]"
      >
        <Box>
          <img src={(currentBranch && currentBranch.image) || background} />
        </Box>
        <Box
          px={4}
          flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className="gap-2"
        >
          <Text.Title className="sub-title">
            {(currentBranch && currentBranch.name) || "Tên chi nhánh"}
          </Text.Title>
          <Text className="text-[var(--text-secondary)]">
            {(currentBranch && currentBranch.address) || "Địa chỉ"}
          </Text>
        </Box>
      </Box>
      <Box
        p={4}
        mt={4}
        flex
        flexDirection="column"
        className="gap-8 bg-[var(--white-color)]"
      >
        <Box
          flex
          flexDirection="column"
          className="gap-2"
          onClick={() => navigate(-1)}
        >
          <Text.Title className="sub-title">1. Chọn chi nhánh</Text.Title>
          <Box flex alignItems="center" justifyContent="space-between">
            <Box flex alignItems="center" className="gap-2">
              <Icon
                className="text-[var(--secondary-color)]"
                icon="zi-location-solid"
              />
              <Text>
                {(currentBranch && currentBranch.name) || "Tên chi nhánh"}
              </Text>
            </Box>
            <Icon icon="zi-chevron-right" />
          </Box>
        </Box>
        <Box
          flex
          flexDirection="column"
          className="gap-2"
          onClick={() => navigate("/product")}
        >
          <Text.Title className="sub-title">2. Chọn dịch vụ</Text.Title>
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
        <Box flex flexDirection="column" className="gap-4">
          <Text.Title className="sub-title">
            3. Chọn ngày giờ và NV phục vụ
          </Text.Title>
          {productsSelected && productsSelected.length > 0 ? (
            <Box
              flex
              alignItems="center"
              justifyContent="space-around"
              className="transition-all gap-2"
            >
              {staffsByBranchId &&
                staffsByBranchId.map((staff) => {
                  return (
                    <Box
                      key={staff.id}
                      flex
                      flexDirection="column"
                      alignItems="center"
                      data={staff.id}
                      justifyContent="center"
                      style={{ gap: "8px", position: "relative" }}
                      className={
                        staff.id === staffIdChosen ? "staff-chosen-active" : ""
                      }
                      onClick={() => {
                        setStaffIdChosen(staff.id);
                        dispatch(changeStaffChosen(staff));
                      }}
                    >
                      <Box width={50} height={50}>
                        <img
                          src={staff.image}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </Box>
                      <Text className="sub-title">{staff.name}</Text>
                    </Box>
                  );
                })}
            </Box>
          ) : (
            ""
          )}
          <Box>
            <DatePicker
              prefix={
                <Box>
                  <Icon
                    className="text-[var(--secondary-color)]"
                    icon="zi-calendar-solid"
                  />
                </Box>
              }
              key={"a"}
              suffix={<Icon icon="zi-chevron-right" />}
              startDate={date}
              value={date}
              mask
              defaultValue={date}
              maskClosable
              dateFormat="dd/mm/yyyy"
              title="Chọn ngày"
              locale="vi-VN"
              onChange={(date) => handleDatePicker(date)}
            />
          </Box>
          {listServices && listServices.length > 0 ? (
            <Box style={{ paddingBottom: 100 }}>
              <TimeSlot></TimeSlot>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      {listServices && listServices.length > 0 ? (
        <Box
          p={4}
          className="fixed bottom-0 bg-[var(--white-color)] w-full gap-4"
          flex
          justifyContent="flex-end"
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px -4px 12px" }}
        >
          <Box
            flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => openChatScreen()}
          >
            <Box>
              <Icon
                className="text-[var(--secondary-color)]"
                icon="zi-chat"
                style={{
                  color: "var(--primary-color)",
                  background: "var(--white-color)",
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box style={{ width: "max-content" }}>Chat Ngay</Box>
          </Box>
          <ButtonNavigate
            style={{ borderRadius: 10, background: "var(--primary-color)" }}
            title="Tiếp tục"
            action={() => navigate("/forminformation")}
          ></ButtonNavigate>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default CreateBooking;
