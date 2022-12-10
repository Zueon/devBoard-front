import { Card, Menu, Modal, Button, notification, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../AppConfig";

import { call, signout } from "../services/ApiService";
import RedBadge from "./RedBadge";
const nickname = sessionStorage.getItem("NICKNAME");
let token = sessionStorage.getItem("ACCESS_TOKEN");

const Profile = (props) => {
  const {
    userInfo,

    post,
  } = props;

  const [note, setNote] = useState({});
  const [alarm, setAlarm] = useState(false);
  const [open, setOpen] = useState(false);

  const connect = () => {
    let subscribeUrl = `${API_BASE_URL}/sub`;
    if (token !== "null") {
      let eventSource = new EventSource(subscribeUrl + "?token=" + token);

      eventSource.addEventListener("connect", function (event) {});

      eventSource.addEventListener("apply", function (event) {
        let message = JSON.parse(event.data);

        new Notification("알림 도착!", { body: "참가 신청이 도착하였습니다!" });
        setNote(message);
        setAlarm(true);
      });

      eventSource.addEventListener("applyY", function (event) {
        let message = JSON.parse(event.data);

        setNote(message);
        setAlarm(true);
      });

      eventSource.addEventListener("applyN", function (event) {
        let message = event.data;
        setNote(message);
      });

      eventSource.addEventListener("error", function (event) {
        eventSource.close();
      });
    }
  };

  const accept = () => {
    call(`/board/projectY/${note.nid}`, "POST").then((res) => {
      console.log(res);
      setOpen(false);
      setAlarm(false);
    });
  };
  const reject = () => {
    call(`/board/projectN/${note.nid}`, "POST").then((res) => {
      console.log(res);
      setOpen(false);
      setAlarm(false);
    });
  };

  const [api, contextHolder] = notification.useNotification();
  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          닫기
        </Button>
        {/* <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          로그인
        </Button> */}
      </Space>
    );
    api.open({
      message: "로그인 필요!",
      description:
        "프로젝트 또는 스터디를 생성하기 위해서는 로그인이 필요합니다!",
      btn,
      key,
      onClose: close,
    });
  };
  const navigate = useNavigate();

  const moveProjCreate = () => {
    if (token !== "null") {
      navigate("/project/create");
    } else {
      openNotification();
    }
  };

  const moveStudyCreate = () => {
    navigate("/study/create");
  };

  const [proj, setProj] = useState({});

  useEffect(() => {
    console.log(post);
    connect();
  }, []);
  console.log(userInfo);
  console.log(post);

  return (
    <>
      {contextHolder}
      <Sider
        width={250}
        className="site-layout-background"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <Card
          style={{ width: "100%", height: 300 }}
          bordered={false}
          title={nickname !== "null" ? nickname : "로그인하세요"}
        >
          {token !== "null" ? <Button onClick={signout}>Logout</Button> : ""}
        </Card>
        <Menu
          mode="inline"
          style={{
            height: "100%",
            borderRight: 0,
          }}
        >
          <Menu.Item
            onClick={() =>
              navigate("/mypage", { state: { userInfo: userInfo } })
            }
          >
            내 정보
          </Menu.Item>

          <Menu.SubMenu title={<RedBadge status={alarm} />}>
            {alarm ? (
              <Menu.Item onClick={() => setOpen(true)}>
                {note.content}
              </Menu.Item>
            ) : (
              ""
            )}
          </Menu.SubMenu>
          <Modal
            title={note.type}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={
              note.type === "APPLY"
                ? [
                    <Button type="primary" onClick={accept}>
                      승낙하기
                    </Button>,
                    <Button onClick={reject}>거절하기</Button>,
                  ]
                : [
                    <Button
                      onClick={() => {
                        setOpen(false);
                        setAlarm(false);
                      }}
                    >
                      닫기
                    </Button>,
                  ]
            }
          >
            <p>{note.content}</p>
          </Modal>

          <Menu.SubMenu title="프로젝트">
            <Menu.Item
              onClick={() => {
                navigate("/myWorkspace", { state: { post: proj } });
              }}
            >
              현재 프로젝트{" "}
            </Menu.Item>
            <Menu.Item onClick={moveProjCreate}>새 프로젝트 생성하기</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="스터디">
            <Menu.Item>현재 스터디 </Menu.Item>
            <Menu.Item onClick={moveStudyCreate}>새 스터디 생성하기</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
    </>
  );
};

export default Profile;
