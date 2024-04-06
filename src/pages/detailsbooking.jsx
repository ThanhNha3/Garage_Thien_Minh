import React, { useState, useEffect, useContext } from "react";
import { Box, Text, Icon } from "zmp-ui";
import ButtonNavigate from "../components/buttonNavigate/buttonNavigate";
import HeaderPage from "../components/headerPage/headerPage";
import { dataContext } from "../components/providerContext/providerContext";
import Store from "../components/redux/store";

const DetailsBooking = () => {
  const { formatCurrency } = useContext(dataContext);
  const [listServices, setListServices] = useState([]);
  useEffect(() => {
    setListServices(Store.getState().productsSelected);
  }, []);

  useEffect(() => {
    Store.subscribe(() => {
      setListServices(Store.getState().productsSelected);
    });
  }, [Store.getState().productsSelected]);
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
      <Box
        className="bg-[var(--white-color)] gap-4"
        flex
        flexDirection="column"
        p={4}
        mt={2}
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
        px={4}
        py={2}
        mt={2}
      >
        <Text className="sub-title">Dịch vụ đã chọn</Text>
        <Box
          className="gap-2 d-block"
          // style={{ maxHeight: "200px" }}
        >
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
