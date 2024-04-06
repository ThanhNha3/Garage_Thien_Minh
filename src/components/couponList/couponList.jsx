import { Box } from "zmp-ui";
import CouponCard from "../cards/couponCard";

const CouponList = ({ listCoupons }) => {
  return (
    <Box px={4} mt={4} flex className="flex-col gap-4">
      {listCoupons.map((coupon) => (
        <CouponCard key={coupon.id} {...coupon} />
      ))}
    </Box>
  );
};

export default CouponList;
