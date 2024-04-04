import React from "react";
import { Avatar, Box, Icon, Text, useNavigate } from "zmp-ui";

const CircleCard = (data) => {
  const navigate = useNavigate();
  const { image = null, icon = null, name, page } = data;
  return (
    <Box flex className="flex-col gap-2" alignItems="center">
      <div>
        {icon ? (
          <Box
            onClick={() => navigate(`/${page}`)}
            width={57}
            height={57}
            flex
            className="rounded-full bg-[--primary-color]"
            justifyContent="center"
            alignItems="center"
          >
            <Icon style={{ color: "#fff" }} icon={icon} />{" "}
          </Box>
        ) : (
          <Avatar src={image} />
        )}
      </div>
      <Text bold>{name}</Text>
    </Box>
  );
};

export default CircleCard;
