import React from "react";
import { Box, Text, useNavigate } from "zmp-ui";
import { ChangeBranchChosen } from "../redux/actions/branchChosenAction";
import Store from "../redux/store";

const BranchCard = (data) => {
  const navigate = useNavigate();
  const {
    id,
    image,
    name,
    address,
  } = data;

  return (
    <Box
      flex
      onClick={() => {
        Store.dispatch(ChangeBranchChosen(id));
        navigate(`/createbooking`);
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
