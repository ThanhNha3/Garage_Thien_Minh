import React, { useEffect } from "react";
import { Box, Text } from "zmp-ui";
import { useSelector, useDispatch } from "react-redux";

import BottomNavigationPage from "../components/bottomNavigation/bottomNavigation";
import CircleCard from "../components/cards/circleCard";
import HomeProductCard from "../components/cards/homeProductCard";
import HeaderBar from "../components/headerbar/headerBar";

import background from "../../public/images/background.jpg";
import image1 from "../../public/images/image1.jpg";
import image2 from "../../public/images/image2.jpg";
import image4 from "../../public/images/image4.jpg";
import { fetchAllProducts } from "../components/redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Box
      px={4}
      flex
      className="flex-col gap-4 bg-[--white-color]"
      style={{ paddingBottom: "100px" }}
    >
      <HeaderBar />
      <Box
        className="gap-8 shadow-lg"
        flex
        justifyContent="center"
        style={{
          border: "var(--background-grey) solid 1px",
          paddingTop: "120px",
        }}
        p={4}
        mt={10}
      >
        <CircleCard
          key={1}
          name="Đặt lịch"
          icon="zi-calendar-solid"
          page="booking"
        />
        <CircleCard
          key={2}
          name="Liên hệ"
          icon="zi-call-solid"
          page="contact"
        />
        <CircleCard key={3} name="Ưu Đãi" icon="zi-star-solid" page="coupon" />
      </Box>
      <Box>
        <img src={background} />
      </Box>
      <Box flex className="flex-col gap-2">
        <Text style={{ fontWeight: "bold" }} size="xLarge">
          Danh sách dịch vụ
        </Text>
        <div className="flex overflow-scroll gap-4">
          {productList.map((product, index) => {
            return <HomeProductCard key={index} {...product} />;
          })}
        </div>
      </Box>
      <Box flex className="flex-col gap-2">
        <Text style={{ fontWeight: "bold" }} size="xLarge">
          Garage Thiện Minh
        </Text>
        <Box flex className="flex-col gap-2">
          <div>
            <img src={image4}></img>
          </div>
          <div>
            <img src={image1}></img>
          </div>
          <div>
            <img src={image2}></img>
          </div>
        </Box>
      </Box>
      <BottomNavigationPage />
    </Box>
  );
};

export default Home;
