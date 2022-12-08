import { Card, Menu, Modal, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { call, signout } from "../services/ApiService";
import RedBadge from "./RedBadge";
const nickname = sessionStorage.getItem("NICKNAME");
let token = sessionStorage.getItem("ACCESS_TOKEN");

const Profile = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const connect = () => {
    let subscribeUrl = "http://localhost:8080/sub";
    if (token != null) {
      let eventSource = new EventSource(subscribeUrl + "?token=" + token);

      eventSource.addEventListener("connect", function (event) {});

      eventSource.addEventListener("apply", function (event) {
        let message = JSON.parse(event.data);
        setNotification(message);
        setAlarm(true);
      });

      eventSource.addEventListener("applyY", function (event) {
        let message = JSON.parse(event.data);
        setNotification(message);
        setAlarm(true);
      });

      eventSource.addEventListener("applyN", function (event) {
        let message = event.data;
        setNotification(message);
      });

      eventSource.addEventListener("error", function (event) {
        eventSource.close();
      });
    }
  };

  const [notification, setNotification] = useState({});
  const [alarm, setAlarm] = useState(false);

  const accept = () => {
    call(`/board/projectY/${notification.nid}`, "POST").then((res) => {
      console.log(res);
      setOpen(false);
      setAlarm(false);
    });
  };
  const reject = () => {
    call(`/board/projectN/${notification.nid}`, "POST").then((res) => {
      console.log(res);
      setOpen(false);
      setAlarm(false);
    });
  };

  const moveProjCreate = () => {
    if (token != null) {
      navigate("/project/create");
    } else {
    }
  };

  const moveStudyCreate = () => {
    navigate("/study/create");
  };

  useEffect(() => {
    connect();
  }, []);

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
      >
        <Button onClick={signout}>Logout</Button>
      </Card>
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

        <Menu.SubMenu title={<RedBadge status={alarm} />}>
          {alarm ? (
            <Menu.Item onClick={() => setOpen(true)}>
              {notification.content}
            </Menu.Item>
          ) : (
            ""
          )}
        </Menu.SubMenu>
        <Modal
          title={notification.type}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          footer={[
            <Button type="primary" onClick={accept}>
              승낙하기
            </Button>,
            <Button onClick={reject}>거절하기</Button>,
          ]}
        >
          <p>{notification.content}</p>
        </Modal>

        <Menu.SubMenu title="프로젝트">
          <Menu.Item>현재 프로젝트 </Menu.Item>
          <Menu.Item onClick={moveProjCreate}>새 프로젝트 생성하기</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="스터디">
          <Menu.Item>현재 스터디 </Menu.Item>
          <Menu.Item onClick={moveStudyCreate}>새 스터디 생성하기</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Profile;
