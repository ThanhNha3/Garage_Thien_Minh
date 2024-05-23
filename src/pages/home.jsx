import React, { useState } from "react";
import { Box, Text } from "zmp-ui";

import BottomNavigationPage from "../components/bottomNavigation/bottomNavigation";
import CircleCard from "../components/cards/circleCard";
import HomeProductCard from "../components/cards/homeProductCard";
import HeaderBar from "../components/headerbar/headerBar";
import Store from "../components/redux/store";

import image1 from "../../public/images/image1.jpg";
import image2 from "../../public/images/image2.jpg";
import image4 from "../../public/images/image4.jpg";

const Home = () => {
  const [productList] = useState(Store.getState().products);
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
        <img src="https://cdn.shopify.com/s/files/1/1110/4458/products/STREETER_AUTO_CO_8_X_16_ART_MURAL_PROOF_II_1024x1024.jpg?v=1580153647" />
      </Box>
      <Box flex className="flex-col gap-2">
        <Text style={{ fontWeight: "bold" }} size="xLarge">
          Danh sách dịch vụ
        </Text>
        <div className="flex overflow-scroll gap-4">
          {productList.map((product) => {
            return <HomeProductCard key={product.id} {...product} />;
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
