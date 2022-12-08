import React, { useEffect, useState } from "react";
import { CrownOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { call } from "../services/ApiService";
import Tab from "../components/Tab";
const { Content, Footer, Sider } = Layout;

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);
//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//       // children: new Array(4).fill(null).map((_, j) => {
//       //   const subKey = index * 4 + j + 1;
//       //   return {
//       //     key: subKey,
//       //     label: `option${subKey}`,
//       //   };
//       // }),
//     };
//   }
// );

const Workspace = () => {
  const [post, setPost] = useState({});

  useEffect(() => {
    call(`/myWorkspace?type=PROJECT`, "GET").then((res) => {
      console.log(res);
      setPost(res.data.data);
    });
  }, []);

  console.log(post);

  const items = post["members"].map((member, idx) => {
    const icon = member["mid"] === post.hostId ? CrownOutlined : UserOutlined;
    return {
      key: member["mid"],
      label: member["nickname"],
      icon: React.createElement(icon),
    };
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Tab />
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
};
export default Workspace;
