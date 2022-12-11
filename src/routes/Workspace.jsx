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
  Result,
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
import Chat from "../components/Chat"
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
<<<<<<< HEAD
  
  const location = useLocation();
  const post = location["state"]["post"];
  console.log("workspace", post);
=======
  // const location = useLocation();
  // const post = location["state"]["post"];
  // console.log("workspace", post);
>>>>>>> 41cccf41f58f2da74215a990f663b0d4405e4524

  // let members = {};
  const [members, setMembers] = useState([]);
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    call("/myWorkspace?type=PROJECT").then((res) => {
      if (res.status === 200) {
        console.log(res);
        console.log(res.data.data.members);
        setMembers(res.data.data.members);
        setIsExist(true);
      }
    });
  }, []);

  let data = members.map((member, idx) => {
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
    children: <Table columns={columns} dataSource={data} />,
  };

  const tab2 = {
    label: "TODO",
    key: "tab2",
  };
  const tab3 = {
    label: "CHATROOM",
    key: "tab3",
    children:(
      <>
        <Chat roomNum={post.pid} />
      </>
    )
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

  return isExist ? (
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
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="현재 참가 중인 프로젝트가 존재하지 않습니다!"
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};
export default Workspace;
