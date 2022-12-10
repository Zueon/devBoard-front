import Layout from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../AppConfig";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import { call } from "../services/ApiService";
let token = sessionStorage.getItem("ACCESS_TOKEN");

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [post, setPost] = useState({});

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
      <Profile userInfo={userInfo} post={post} />
    </Layout>
  );
};

export default Post;
