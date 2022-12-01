import { Card, Menu, Image } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

import { signout } from "../services/ApiService";

const Profile = () => {
  return (
    <Sider
      width={250}
      className="site-layout-background"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Card
        style={{ width: "100%", height: 300 }}
        bordered={false}
        title={localStorage.getItem("NICKNAME")}
      ></Card>
      <Menu
        mode="inline"
        style={{
          height: "100%",
          borderRight: 0,
        }}
      >
        <Menu.Item>item1</Menu.Item>
        <Menu.Item>item2</Menu.Item>
        <Menu.Item>item3</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Profile;
