import { Col, Layout, Menu, Row } from "antd";
import Typography from "antd/es/typography/Typography";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const Nav = () => {
  const location = useLocation().pathname;
  const pathname = location.replace("/", "");

  const [current, setCurrent] = useState(pathname);

  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate("/" + e.key);
  };

  return (
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        // items={items}
        onClick={onClick}
        selectedKeys={[current]}
      >
        <Menu.Item key={"project"}>프로젝트</Menu.Item>
        <Menu.Item key={"study"}>스터디</Menu.Item>
        <Menu.Item key={"login"} style={{ margin: "auto 0 0 auto" }}>
          로그인
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Nav;
