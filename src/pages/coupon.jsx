import React, { useEffect, useState } from "react";
import { Box, Text, Header } from "zmp-ui";
import CouponCard from "../components/cards/couponCard";
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
      <Box px={4} mt={4} flex className="flex-col gap-4">
        {listCoupons.map((coupon) => (
          <CouponCard key={coupon.id} {...coupon} />
        ))}
      </Box>
    </Box>
  );
};

export default Coupon;
