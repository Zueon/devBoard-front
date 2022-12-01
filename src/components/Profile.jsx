import { Card, Menu, Image } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

import { signout } from "../services/ApiService";
import RedBadge from "./RedBadge";
const nickname = localStorage.getItem("NICKNAME");

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
        title={nickname}
      ></Card>
      <Menu
        mode="inline"
        style={{
          height: "100%",
          borderRight: 0,
        }}
      >
        <Menu.Item>
          <a href={`/mypage/${nickname}`}>내 정보</a>
        </Menu.Item>

        <Menu.SubMenu title={<RedBadge status={true} />}>
          <Menu.Item>샘플 알람1</Menu.Item>
          <Menu.Item>샘플 알람2</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu title="프로젝트">
          <Menu.Item>현재 프로젝트 </Menu.Item>
          <Menu.Item>새 프로젝트 생성하기</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="스터디">
          <Menu.Item>현재 스터디 </Menu.Item>
          <Menu.Item>새 스터디 생성하기</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Profile;
