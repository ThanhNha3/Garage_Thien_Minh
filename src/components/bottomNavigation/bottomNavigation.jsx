import React, { useState } from "react";
import { BottomNavigation, Icon, useNavigate } from "zmp-ui";
import { openChat } from "zmp-sdk/apis";

const BottomNavigationPage = (props) => {
  const [activeTab, setActiveTab] = useState("chat");
  const navigate = useNavigate();

  const openChatScreen = () => {
    openChat({
      type: "oa",
      id: "",
      message: "Xin Chào",
      success: () => {},
      fail: (err) => {},
    });
    openChat();
  };

  return (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
    >
      <BottomNavigation.Item
        key="chat"
        label="Trang Chủ"
        icon={<Icon icon="zi-home" />}
        onClick={() => navigate("/")}
        activeIcon={<Icon icon="zi-home" />}
      />
      <BottomNavigation.Item
        label="Đặt lịch"
        key="contact"
        onClick={() => navigate("/booking")}
        icon={<Icon icon="zi-calendar" />}
        activeIcon={<Icon icon="zi-calendar-solid" />}
      />
      <BottomNavigation.Item
        label="Chat ngay"
        key="discovery"
        icon={<Icon icon="zi-chat" />}
        onClick={openChatScreen}
        activeIcon={<Icon icon="zi-chat-solid" />}
      />
      <BottomNavigation.Item
        key="timeline"
        label="Liên hệ"
        onClick={() => navigate("/contact")}
        icon={<Icon icon="zi-call" />}
        activeIcon={<Icon icon="zi-call-solid" />}
      />
    </BottomNavigation>
  );
};

export default BottomNavigationPage;
