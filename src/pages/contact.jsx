import React from "react";
import { Box, Text, Header, Icon } from "zmp-ui";

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
              Nhà Máy Sản Xuất: Quốc lộ N2, Xã Hòa Khánh Đông, Đức Hòa, Long An.
            </li>
            <li>Chi Nhánh Miền Tây: 459 Võ Văn Kiệt, P2, Sóc Trăng.</li>
            <li>
              Chi nhánh miền trung 1 : Thôn Lạc Sơn 2 , Xã Cà Ná , Huyện Thuận
              Nam , Tỉnh Ninh Thuận.
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
              <a href="tel:0999888777">099 988 8777</a>
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
      </Box>
    </Box>
  );
};

export default Contact;
