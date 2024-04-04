import React from "react";
import { Box, Text } from "zmp-ui";

const HomeProductCard = (data) => {
  const {
    image,
    price,
    name,
    id,
    description,
    category_id,
    status,
    orders,
    create_at,
    update_at,
  } = data;
  return (
    <Box
      // height={242.22}
      style={{
        minWidth: "156px",
        border: "var(--background-grey) solid 1px",
        background: "white",
      }}
      className="rounded-md overflow-hidden"
    >
      <Box className="w-100" height={156}>
        <img
          className="w-full h-full object-cover"
          // style={{
          //   width: "156px",
          //   height: "156px",
          // }}
          src={image}
        />
      </Box>
      <Box flex className="flex-col gap-2" p={2}>
        <Text>{name}</Text>
        <Text style={{ fontWeight: "bold" }}>{price} đ</Text>
      </Box>
    </Box>
  );
};

export default HomeProductCard;
