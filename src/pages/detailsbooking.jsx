import React, { useState, useEffect, useContext } from "react";
import { Box, Text, Icon } from "zmp-ui";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import HeaderPage from "../components/headerPage/headerPage";
import { dataContext } from "../components/providerContext/providerContext";
import Store from "../components/redux/store";

const DetailsBooking = () => {
  const [customerInformation, setCustomerInformation] = useState(
    Store.getState().customerInformation
  );
  const [datePicker, setDatePicker] = useState(Store.getState().datePicker);
  const [listServices, setListServices] = useState(
    Store.getState().productsSelected
  );
  const [staffChosen, setStaffChosen] = useState({});
  const [timePicker, setTimePicker] = useState({});
  const [branchChosen, setBranchChosen] = useState({});
  const { formatCurrency } = useContext(dataContext);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    Store.subscribe(() => {
      setListServices(Store.getState().productsSelected);
    });
  }, [Store.getState().productsSelected]);

  const formatDatePicker = (datePicker) => {
    return datePicker.toLocaleDateString("vi-VN");
  };

  return (
    <Box>
      <HeaderPage title="Phiếu đặt lịch"></HeaderPage>
      <Box
        flex
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
        className="bg-[var(--white-color)]"
      >
        <Box>
          <Text className="text-[var(--text-disable)]">#123</Text>
        </Box>
        <Box p={2} className="bg-[var(--secondary-color)] rounded text-white">
          Chờ xác nhận
        </Box>
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
            <Text>{customerInformation.note}</Text>
          </Box>
        </Box>
      </Box>
      <Box p={4} mb={10} className="gap-2 bg-[var(--white-color)]" mt={2}>
        <ButtonNavigate
          style={{
            borderRadius: 10,
            border: "red solid 1px",
            background: "white",
            color: "red",
            fontWeight: "bold",
          }}
          isCancel={true}
          title="Hủy đặt lịch"
        ></ButtonNavigate>
      </Box>
    </Box>
  );
};

export default DetailsBooking;
