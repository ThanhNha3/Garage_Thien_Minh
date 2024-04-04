import React, { useState, useEffect } from "react";
import { Box, Text } from "zmp-ui";
import BottomNavigationPage from "../components/bottomNavigation/bottomNavigation";
import CircleCard from "../components/cards/circleCard";
import HomeProductCard from "../components/cards/homeProductCard";
import HeaderBar from "../components/headerbar/headerBar";
import Store from "../components/redux/store";

const Home = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    setProductList(Store.getState().products);
  }, [Store.getState().products]);
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
            <img src="https://th.bing.com/th/id/R.45bca37cb7d65060549930b08728c75d?rik=qsEQ6vjtV%2fNFNQ&riu=http%3a%2f%2fstarweb.web.fc2.com%2f_src%2fsc34%2fP1020583.JPG&ehk=jhL8pqasvlGCatSNRgYdSf7fE51CzjiJJPv1qQrL1%2fM%3d&risl=&pid=ImgRaw&r=0"></img>
          </div>
          <div>
            <img src="https://th.bing.com/th/id/R.45bca37cb7d65060549930b08728c75d?rik=qsEQ6vjtV%2fNFNQ&riu=http%3a%2f%2fstarweb.web.fc2.com%2f_src%2fsc34%2fP1020583.JPG&ehk=jhL8pqasvlGCatSNRgYdSf7fE51CzjiJJPv1qQrL1%2fM%3d&risl=&pid=ImgRaw&r=0"></img>
          </div>
          <div>
            <img src="https://th.bing.com/th/id/R.45bca37cb7d65060549930b08728c75d?rik=qsEQ6vjtV%2fNFNQ&riu=http%3a%2f%2fstarweb.web.fc2.com%2f_src%2fsc34%2fP1020583.JPG&ehk=jhL8pqasvlGCatSNRgYdSf7fE51CzjiJJPv1qQrL1%2fM%3d&risl=&pid=ImgRaw&r=0"></img>
          </div>
        </Box>
      </Box>
      <BottomNavigationPage />
    </Box>
    // <>
    //   <Box>Home</Box>
    // </>
  );
};

export default Home;
