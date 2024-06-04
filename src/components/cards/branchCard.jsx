import React, { useContext } from "react";
import { Box, Text } from "zmp-ui";
import { dataContext } from "../providerContext/providerContext";

const BranchCard = (data) => {
  const { navigate } = useContext(dataContext);
  const { id, image, name, address } = data;

  return (
    <Box
      flex
      onClick={() => {
        navigate(`/createbooking/${id}`);
      }}
      className="gap-2 bg-[var(--white-color)]"
      px={4}
      py={2}
    >
      <Box>
        <img width={135} height={76} src={image} />
      </Box>
      <Box flex flexDirection="column" className="gap-2">
        <Text.Title className="sub-title">{name}</Text.Title>
        <Text>{address}</Text>
      </Box>
    </Box>
  );
};

export default BranchCard;
