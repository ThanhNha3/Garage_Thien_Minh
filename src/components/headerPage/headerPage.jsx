import React, { memo } from "react";
import { Box, Header, Icon, Text, useNavigate } from "zmp-ui";

const HeaderPage = ({ title, isBackHome }) => {
  const navigate = useNavigate();
  return (
    <Header
      showBackIcon={!isBackHome}
      className="header-sticky"
      title={
        <Box flex alignItems="center">
          {isBackHome ? (
            <Icon onClick={() => navigate("/")} icon="zi-chevron-left-header" />
          ) : (
            ""
          )}
          <Text size="xLarge" className="sub-title">
            {title}
          </Text>
        </Box>
      }
    ></Header>
  );
};

export default memo(HeaderPage);
