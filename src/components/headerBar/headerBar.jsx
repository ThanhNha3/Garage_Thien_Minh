import React, { useContext } from "react";
import { Avatar, Box, Header, Text } from "zmp-ui";

import { dataContext } from "../providerContext/providerContext";

const HeaderBar = () => {
  const { userInfo } = useContext(dataContext);

  return (
    <Header
      flex
      showBackIcon={false}
      alignItems="center"
      className="gap-2 app-header no-border pl-4 flex-none py-4"
      style={{height:"max-content"}}
      title={
        <Box flex className="gap-2">
          <Box>
            <Avatar src={userInfo.avatar} />
          </Box>
          <Box flex className="flex-col gap-2">
            <Text size="small">Xin chào,</Text>
            <Text bold>{userInfo.name}</Text>
          </Box>
        </Box>
      }
    ></Header>
  );
};

export default HeaderBar;
