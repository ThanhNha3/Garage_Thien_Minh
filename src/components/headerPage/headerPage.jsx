import React from "react";
import { Header, Text } from "zmp-ui";
const HeaderPage = ({ title }) => {
  return (
    <Header
      className="header-sticky"
      title={
        <Text size="xLarge" className="sub-title">
          {title}
        </Text>
      }
    ></Header>
  );
};

export default HeaderPage;
