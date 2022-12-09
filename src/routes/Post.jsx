import Layout from "antd/es/layout/layout";
import React from "react";
import PostList from "../components/PostList";
import Profile from "../components/Profile";

const Post = () => {
  return (
    <Layout>
      <PostList />
      <Profile />
    </Layout>
  );
};

export default Post;
