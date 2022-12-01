import { Card, Menu, Image } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const Profile = () => {
  return (
    <Sider
      width={250}
      className="site-layout-background"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Card style={{ width: "100%", height: 300 }} bordered={false}></Card>
      <Menu
        mode="inline"
        style={{
          height: "100%",
          borderRight: 0,
        }}
      />
    </Sider>
  );
};

export default Profile;
