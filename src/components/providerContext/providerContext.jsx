import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserInfo } from "zmp-sdk/apis";
import { fetchAllBranches } from "../redux/slices/branchSlice";
import { fetchAllCategories } from "../redux/slices/categorySlice";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { fetchAllStaffs } from "../redux/slices/staffSlice";
import { fetchAllTimeSlots } from "../redux/slices/timeSlotSlice";

export const dataContext = createContext(null);

const ProviderContext = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllStaffs());
    dispatch(fetchAllBranches());
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
    dispatch(fetchAllTimeSlots());
  }, [dispatch]);

  const [userInfo, setUserInfo] = useState({});

  console.log();

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  function convertDate(inputDate) {
    // Tách ngày, tháng, năm từ chuỗi input
    const [day, month, year] = inputDate.split("/").map(Number);

    // Tạo đối tượng Date từ các giá trị ngày, tháng, năm
    const date = new Date(year, month - 1, day);

    // Lấy giá trị năm, tháng, ngày
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Tháng từ 0-11 nên cần +1
    const dd = String(date.getDate()).padStart(2, "0");

    // Trả về chuỗi ngày tháng theo định dạng yyyy-mm-dd
    return `${yyyy}-${mm}-${dd}`;
  }

  const handleTimeActive = (time) => {
    // Lấy thời gian hiện tại
    var now = new Date();
    var currentHours = now.getHours();
    var currentMinutes = now.getMinutes();

    // Chuyển đổi chuỗi thời gian "08:00" thành đối tượng Date
    var timeString = time;
    var timeParts = timeString.split(":");
    var targetHours = parseInt(timeParts[0], 10);
    var targetMinutes = parseInt(timeParts[1], 10);

    // So sánh thời gian
    if (
      currentHours > targetHours ||
      (currentHours === targetHours && currentMinutes > targetMinutes)
    ) {
      return false;
    } else if (
      currentHours < targetHours ||
      (currentHours === targetHours && currentMinutes < targetMinutes)
    ) {
      return true;
    } else {
      return true;
    }
  };

  const formatTimeSlot = (time) => {
    if (time) {
      const index = time.lastIndexOf(":");
      return time.slice(0, index);
    }
    return time;
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
    setUserInfo(async () => await getUser());
  }, []);

  const payload = {
    userInfo,
    formatCurrency,
    dispatch,
    navigate,
    formatDate,
    handleTimeActive,
    convertDate,
    formatTimeSlot,
  };
  return (
    <dataContext.Provider value={payload}>
      {props.children}
    </dataContext.Provider>
  );
};

export default ProviderContext;
