import React from "react";
import { Box, Text, Header, Icon } from "zmp-ui";

import image5 from "../../public/images/image5.jpg";
import image6 from "../../public/images/image6.jpg";
import image7 from "../../public/images/image7.jpg";
import image8 from "../../public/images/image8.jpg";
import image9 from "../../public/images/image9.jpg";
import image10 from "../../public/images/image10.jpg";

const Contact = () => {
  return (
    <Box className="bg-[var(--white-color)]" style={{ paddingBottom: "100px" }}>
      <Header
        className="position-relative"
        title={
          <Text size="xLarge" className="sub-title">
            Liên hệ
          </Text>
        }
      ></Header>
      <Box flex className="flex-col gap-8" mt={2}>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title">
            Garage Thiện Minh
          </Text>
          <Box p={1} width={100} className="bg-[var(--primary-color)]"></Box>
        </Box>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title text-[var(--primary-color)]">
            Về chúng tôi - Garage Thiện Minh
          </Text>
          <Text>
            Garage Thiện Minh là địa điểm tin cậy cho sửa chữa ô tô tại khu vực.
            Với đội ngũ kỹ thuật viên chuyên nghiệp, chúng tôi cam kết mang đến
            dịch vụ chất lượng và thân thiện. Hãy để Garage Thiện Minh chăm sóc
            chiếc xe của bạn, nơi mà sự an tâm và hiệu quả đều được đặt lên hàng
            đầu.
          </Text>
        </Box>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title text-[var(--primary-color)]">
            Địa chỉ
          </Text>
          <ul className="list-disc px-4 flex flex-col gap-2">
            <li>
              91/36A hẻm 91. Đ.Cách Mạng Tháng 8, P.An Thới Q.Bình Thuỷ, Tp.Cần
              Thơ
            </li>
          </ul>
        </Box>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title text-[var(--primary-color)]">
            Chăm sóc khách hàng
          </Text>
          <Box flex className="items-center gap-2">
            <Icon
              className="text-[var(--primary-color)]"
              icon="zi-call-solid"
            />
            <Text className="sub-title">
              <a href="tel:0943125799">0943 125 799</a>
            </Text>
          </Box>
        </Box>
        <Box px={4} flex className="flex-col gap-2">
          <Text size="xLarge" className="sub-title">
            Thư viện ảnh
          </Text>
          <Box p={1} width={100} className="bg-[var(--primary-color)]"></Box>
          <Box flex className="flex-col gap-2">
            <div>
              <img src={image5}></img>
            </div>
            <div>
              <img src={image6}></img>
            </div>
            <div>
              <img src={image7}></img>
            </div>
            <div>
              <img src={image8}></img>
            </div>
            <div>
              <img src={image9}></img>
            </div>
            <div>
              <img src={image10}></img>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
