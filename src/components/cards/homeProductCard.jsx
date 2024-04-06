import React, { useContext } from "react";
import { Box, Text } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";

const HomeProductCard = (data) => {
  const { image, price, name } = data;

  const { formatCurrency } = useContext(dataContext);
  return (
    <Box
      style={{
        minWidth: "156px",
        border: "var(--background-grey) solid 1px",
        background: "white",
      }}
      className="rounded-md overflow-hidden"
    >
      <Box className="w-100" height={156}>
        <img className="w-full h-full object-cover" src={image} />
      </Box>
      <Box flex className="flex-col gap-2" p={2}>
        <Text>{name}</Text>
        <Text style={{ fontWeight: "bold" }}>{formatCurrency(price)}</Text>
      </Box>
    </Box>
  );
};

export default HomeProductCard;
