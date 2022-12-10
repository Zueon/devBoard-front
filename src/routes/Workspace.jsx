import React, { useEffect, useState } from "react";
import { CrownOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";
import {
  List,
  Breadcrumb,
  Layout,
  Menu,
  Space,
  Table,
  Tabs,
  Tag,
  theme,
  Upload,
} from "antd";
import { call } from "../services/ApiService";
import Tab from "../components/Tab";
import MembersList from "../components/MembersList";
import { useLocation } from "react-router-dom";
import { Typography } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import UploadFiles from "../components/UploadFiles";
const { Content, Footer, Sider } = Layout;
const { Title } = Typography;
const fileList = [
  {
    uid: "0",
    name: "xxx.png",
    status: "uploading",
    percent: 33,
  },
  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    uid: "-2",
    name: "zzz.png",
    status: "error",
  },
];
const Workspace = () => {
  const location = useLocation();
  const post = location["state"]["post"];
  console.log("workspace", post);

  let members = post["members"].map((member, idx) => {
    console.log(member);
    return {
      ...member,
      tags: ["test", "dev"],
    };
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const tab1 = {
    label: "INFO",
    key: "tab1",
    children: <Table columns={columns} dataSource={members} />,
  };

  const tab2 = {
    label: "TODO",
    key: "tab2",
  };
  const tab3 = {
    label: "CHATROOM",
    key: "tab3",
  };
  const tab4 = {
    label: "ARCHIVE",
    key: "tab4",
    children: (
      <>
        <UploadFiles />
      </>
    ),
  };

  const tabs = [tab1, tab2, tab3, tab4];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        margin: "16px 0",
      }}
    >
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
          }}
        >
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Tabs type="card" items={tabs} />
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
