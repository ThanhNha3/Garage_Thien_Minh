import React, { lazy, useEffect, useState, Suspense } from "react";
import { Box, Text, Header } from "zmp-ui";
const CouponList = lazy(() => import("../components/couponList/couponList"));
import Store from "../components/redux/store";

const Coupon = () => {
  const [couponTab, setCouponTab] = useState(1);
  const [listCoupons, setLishCoupons] = useState([]);
  useEffect(() => {
    setLishCoupons(() => {
      return Store.getState().coupons.filter(
        (coupon) => coupon.status === couponTab
      );
    });
  }, [Store.getState().coupons, couponTab]);
  return (
    <Box>
      <Header
        className="header-sticky"
        title={
          <Text size="xLarge" className="sub-title">
            Ưu đãi của tôi
          </Text>
        }
      ></Header>
      <Box px={4} className="bg-[var(--white-color)]">
        <Box flex justifyContent="space-between">
          <Box
            alignItems="center"
            onClick={() => setCouponTab(1)}
            style={
              couponTab === 1
                ? {
                    borderBottom: "var(--primary-color) solid 3px",
                    color: "var(--primary-color)",
                  }
                : {}
            }
            className="flex-1 sub-title"
            py={2}
          >
            <Text className="text-center sub-title">Tất cả</Text>
          </Box>
          <Box
            alignItems="center"
            onClick={() => setCouponTab(0)}
            style={
              couponTab === 0
                ? {
                    borderBottom: "var(--primary-color) solid 3px",
                    color: "var(--primary-color)",
                  }
                : {}
            }
            className="flex-1 sub-title"
            py={2}
          >
            <Text className="text-center sub-title">Đã dùng</Text>
          </Box>
        </Box>
        <Box py={4}>
          <form>
            <Box flex justifyContent="space-between">
              <input
                className="outline-none border-none"
                placeholder="Nhập mã ưu đãi của bạn..."
              />
              <button
                type="button"
                className="bg-[var(--primary-color)] p-2 rounded text-[var(--white-color)]"
              >
                Áp dụng
              </button>
            </Box>
          </form>
        </Box>
      </Box>
      <Suspense fallback={"Đang tải..."}>
        <CouponList listCoupons={listCoupons} />
      </Suspense>
    </Box>
  );
};

export default Coupon;
