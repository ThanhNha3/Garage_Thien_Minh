import React, { useContext, useEffect, useState } from "react";
import { Box, Icon, Text, useNavigate, DatePicker } from "zmp-ui";
import { openChat } from "zmp-sdk/apis";
import Store from "../components/redux/store";
import { dataContext } from "../components/providerContext/providerContext";
import { ChangeStaffChosen } from "../components/redux/actions/staffChosenAction";
import { ChangeDatePicker } from "../components/redux/actions/datePickerAction";
import TimePicker from "../components/timePicker/timePicker";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import HeaderPage from "../components/headerPage/headerPage";

const CreateBooking = () => {
  const navigate = useNavigate();
  const [currentBranch, setCurrentBranch] = useState(Store);
  const [listStaffs, setListStaffs] = useState([]);
  const { formatCurrency } = useContext(dataContext);
  const [listServices] = useState(
    Store.getState().productsSelected
  );
  const [staffIdChosen, setStaffIdChosen] = useState(
    Store.getState().staffChosen
  );
  const [date, setDate] = useState(Store.getState().datePicker);

  useEffect(() => {
    setCurrentBranch(() => {
      return Store.getState().branches.find(
        (branch) => branch.id === Store.getState().branchChosen
      );
    });
    setListStaffs(() => {
      return Store.getState().users.filter((user) => user.role === 1);
    });
  }, []);

  useEffect(() => {
    Store.dispatch(ChangeStaffChosen(staffIdChosen));
  }, [staffIdChosen]);

  useEffect(() => {
    Store.dispatch(ChangeDatePicker(date));
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
          <img src={currentBranch.image} />
        </Box>
        <Box
          px={4}
          flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          className="gap-2"
        >
          <Text.Title className="sub-title">{currentBranch.name}</Text.Title>
          <Text className="text-[var(--text-secondary)]">
            {currentBranch.address}
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
              <Text>{currentBranch.name}</Text>
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
        <Box flex flexDirection="column" className="gap-4">
          <Text.Title className="sub-title">
            3. Chọn ngày giờ và NV phục vụ
          </Text.Title>
          {listServices.length > 0 ? (
            <Box
              flex
              alignItems="center"
              justifyContent="space-between"
              className="transition-all"
            >
              {listStaffs.map((staff) => {
                return (
                  <Box
                    key={staff.id}
                    flex
                    flexDirection="column"
                    alignItems="center"
                    dât={staff.id}
                    justifyContent="center"
                    style={{ gap: "8px", position: "relative" }}
                    className={
                      staff.id === staffIdChosen ? "staff-chosen-active" : ""
                    }
                    onClick={() => {
                      setStaffIdChosen(staff.id);
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
              startDate={Store.getState().datePicker}
              value={Store.getState().datePicker}
              mask
              defaultValue={Store.getState().datePicker}
              maskClosable
              dateFormat="dd/mm/yyyy"
              title="Chọn ngày"
              locale="vi-VN"
              onChange={(date) => handleDatePicker(date)}
            />
          </Box>
          {listServices.length > 0 ? (
            <Box style={{ paddingBottom: 100 }}>
              <TimePicker></TimePicker>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      {listServices.length > 0 ? (
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
