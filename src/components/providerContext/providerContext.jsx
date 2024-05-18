import React, { createContext, useEffect, useState } from "react";
import { getUserInfo } from "zmp-sdk/apis";

export const dataContext = createContext(null);

const ProviderContext = (props) => {
  const [userInfo, setUserInfo] = useState({});

  const formatDatePicker = (datePicker) => {
    return datePicker.toLocaleDateString("vi-VN");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const { userInfo } = await getUserInfo({});
        setUserInfo(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    setUserInfo(() => getUser());
  }, []);
  const payload = {
    userInfo,
    formatCurrency,
    formatDatePicker,
  };
  return (
    <dataContext.Provider value={payload}>
      {props.children}
    </dataContext.Provider>
  );
};

export default ProviderContext;
