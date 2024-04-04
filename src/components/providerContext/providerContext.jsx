import React, { createContext, useEffect, useState } from "react";
import { Box } from "zmp-ui";
import { getUserInfo } from "zmp-sdk/apis";

export const dataContext = createContext(null);

const ProviderContext = (props) => {
  //States
  const [userInfo, setUserInfo] = useState({});
  const [cartItemsId, setCartItemsId] = useState([]);
  const [serviceNumbers, setServiceNumbers] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const data = {
    staffs: [
      {
        id: 1,
        name: "Thanh Nhả",
        image: "https://pbs.twimg.com/media/EUxmPVsVAAAx2Ta.jpg",
      },
      {
        id: 2,
        name: "Thanh Nhả",
        image: "https://pbs.twimg.com/media/EUxmPVsVAAAx2Ta.jpg",
      },
    ],
    tabs: [
      {
        id: 1,
        name: "Đặt lịch",
        icon: "zi-calendar-solid",
        page: "booking",
      },
      {
        id: 2,
        name: "Liên hệ",
        icon: "zi-call-solid",
        page: "contact",
      },
      {
        id: 3,
        name: "Ưu Đãi",
        // icon: "zi-notif-ring",
        icon: "zi-star-solid",
        page: "coupon",
      },
    ],
    cities: [
      {
        id: 1,
        name: "Cần Thơ",
        total: 2,
      },
      {
        id: 2,
        name: "Sóc Trăng",
        total: 3,
      },
      {
        id: 3,
        name: "Hà Nội",
        total: 1,
      },
    ],
  };

  useEffect(() => {
    // Lấy thông tin user đăng nhập
    const getUser = async () => {
      try {
        const { userInfo } = await getUserInfo({});
        setUserInfo(userInfo);
      } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    };
    const userInfo = getUser();
  }, []);

  // payload
  const payload = {
    data,
    userInfo,
    formatCurrency,
    cartItemsId,
    setCartItemsId,
    serviceNumbers,
    setServiceNumbers,
    totalPrice,
    setTotalPrice,
  };

  return (
    <dataContext.Provider value={payload}>
      {props.children}
    </dataContext.Provider>
  );
};

export default ProviderContext;
