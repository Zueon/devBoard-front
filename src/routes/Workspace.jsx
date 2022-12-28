import React, { useEffect, useState } from "react";
import {
  Layout,
  Space,
  Table,
  Tabs,
  Tag,
  theme,
  Result,
  Input,
  Form,
  Checkbox,
} from "antd";
import { call } from "../services/ApiService";

import { Button } from "antd";
import UploadFiles from "../components/UploadFiles";
import Update from "../components/Update";
import Chat from "../components/Chat";

const { Content, Footer } = Layout;
const MID = sessionStorage.getItem("MID");

const Workspace = () => {
  const [members, setMembers] = useState([]);
  const [isExist, setIsExist] = useState(false);
  const [todos, setTodos] = useState([]);
  const [pid, setPid] = useState("");
  const [hostId, setHostId] = useState("");

  useEffect(() => {
    call("/member/").then((res) => {
      if (res.status === 200) {
        console.log(res);

        setMembers(res.data.data.project.members);
        setTodos(res.data.data.project.todos);
        setPid(res.data.data.project.pid);
        setHostId(res.data.data.project.hostId);
        setIsExist(true);
      }
    });
  }, []);

  let data = members.map((member, idx) => {
    console.log(member);
    return {
      ...member,
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

  let data2 = todos.map((todo, idx) => {
    console.log(todo);
    return {
      ...todo,
    };
  });

  const columns2 = [
    {
      title: "할 일",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "작성자",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "상태",
      dataIndex: "isDone",
      key: "tid",
      render: (text) => (
        <>{text === 0 || null ? <Checkbox /> : <Checkbox checked />}</>
      ),
    },
    {
      title: "Action",
      key: "tid",
      dataIndex: "tid",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={removeTodo} name={text}>
            삭제
          </a>
        </Space>
      ),
    },
  ];

  const removeTodo = (e) => {
    call(`/project/${pid}/todos`, "DELETE", { tid: e.target.name }).then(
      (res) => {
        console.log(res);
        setTodos(res.data.data);
      }
    );
  };

  const tab1 = {
    label: "INFO",
    key: "tab1",
    children: <Table columns={columns} dataSource={data} />,
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    call(`/project/${pid}/todos`, "POST", { ...values, isDone: 0 }).then(
      (res) => {
        console.log(res);
        setTodos(res.data.data);
      }
    );
  };
  const tab2 = {
    label: "TODO",
    key: "tab2",
    children: (
      <>
        <Form onFinish={onFinish}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="할일을 추가하세요"
              style={{
                width: "calc(100% - 200px)",
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Form>
        <Table columns={columns2} dataSource={data2} />
      </>
    ),
  };

  const tab3 = {
    label: "CHATROOM",
    key: "tab3",
    children: (
      <>
        <Chat roomNum={pid} />
      </>
    ),
  };
  const tab4 = {
    label: "ARCHIVE",
    key: "tab4",
    children: (
      <>
        <UploadFiles pid={pid} />
      </>
    ),
  };

  const tab5 = {
    label: "SETTING",
    key: "tab5",
    children:
      hostId == MID ? (
        <Update pid={pid} />
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="프로젝트 수정이 불가능합니다!"
        />
      ),
  };

  const tabs = [tab1, tab2, tab3, tab4, tab5];

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
