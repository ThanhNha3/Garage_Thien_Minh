import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserInfo } from "zmp-sdk/apis";

export const dataContext = createContext(null);

const ProviderContext = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

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
        console.log(userInfo);
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
    dispatch,
    navigate,
    formatDate,
  };
  return (
    <dataContext.Provider value={payload}>
      {props.children}
    </dataContext.Provider>
  );
};

export default ProviderContext;
