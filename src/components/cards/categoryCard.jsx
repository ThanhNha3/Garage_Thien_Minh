import React from "react";
import { Box, Text } from "zmp-ui";

const CategoryCard = (data) => {
  const {
    id,
    name,
    orders,
    create_at,
    update_at,
    image,
    idActive,
    setIdActiveFnc,
  } = data;

  return (
    <Box
      flex
      flexDirection="column"
      alignItems="center"
      style={
        id === idActive
          ? {
              background: "white",
              borderRadius: "10px",
              borderBottom: "var(--primary-color) solid 3px",
            }
          : {}
      }
      onClick={() => setIdActiveFnc(id)}
    >
      <Box width={78} height={78}>
        <img className="w-full object-cover" src={image} />
      </Box>
      <Text>{name}</Text>
    </Box>
  );
};

export default CategoryCard;
