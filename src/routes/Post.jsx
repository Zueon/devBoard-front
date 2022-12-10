import Layout from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../AppConfig";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import { call } from "../services/ApiService";
let token = sessionStorage.getItem("ACCESS_TOKEN");

const Post = () => {
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

  const [posts, setPosts] = useState([]);
  const [note, setNote] = useState({});
  const [alarm, setAlarm] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [post, setPost] = useState({});
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const type = path === "/study" ? "STUDY" : "PROJECT";

  useEffect(() => {
    call(`/board?type=${type}`, "GET", null).then((res) => {
      setPosts(res.data.data);
    });
    call(`/auth/getMember`, "GET").then((res) => {
      setUserInfo(res.data.data);
      setPost(res.data.data.proj);
    });
  }, [type]);

  console.log(userInfo);
  console.log(posts);
  return (
    <Layout>
      <PostList posts={posts} />
      <Profile
        userInfo={userInfo}
        alarm={alarm}
        note={note}
        accept={accept}
        reject={reject}
        open={open}
        post={post}
        setOpen={setOpen}
        setAlarm={setAlarm}
      />
    </Layout>
  );
};

export default Post;
