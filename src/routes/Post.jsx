import Layout from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PostList from "../components/PostList";
import Profile from "../components/Profile";
import { call } from "../services/ApiService";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [post, setPost] = useState({});

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    call(`${path}/list`, "GET", null).then((res) => {
      setPosts(res.data.data);
    });
    call(`/member/`, "GET").then((res) => {
      setUserInfo(res.data.data);
      setPost(res.data.data.proj);
    });
  }, [path]);

  console.log(userInfo);

  return (
    <Layout>
      <PostList posts={posts} />
      <Profile userInfo={userInfo} post={post} />
    </Layout>
  );
};

export default Post;
