import React, { useEffect, useState } from "react";
import { Layout, Row } from "antd";
import Paging from "./Paging";
import Profile from "./Profile";
import { call } from "../services/ApiService";
import PostItem from "./PostItem";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    call(`/board${path}`, "GET", null).then((res) => {
      console.log(res);
      setPosts(res.data);
    });
  }, [path]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  const postItems =
    currentPosts(posts).length > 0 &&
    currentPosts(posts).map((post, idx) => (
      <PostItem post={post} key={post.project_id} />
    ));

  return (
    <Layout>
      <Layout
        style={{
          padding: "0 24px 24px",
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            marginTop: 20,
            minHeight: 280,
          }}
        >
          <div className="site-card-wrapper">
            <Row gutter={[16, 30]}>{postItems}</Row>
          </div>
          <Paging
            itemsCountPerPage={postsPerPage}
            totalItemsCount={posts.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Content>
      </Layout>
      <Profile />
    </Layout>
  );
};

export default PostList;
