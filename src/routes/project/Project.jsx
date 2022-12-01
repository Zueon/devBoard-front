import React, { useEffect, useState } from "react";
import { Layout, Row } from "antd";

import Paging from "../../components/Paging";
import Profile from "../../components/Profile";
import PostItem from "../../components/PostItem";

import { call } from "../../services/ApiService";

const { Content } = Layout;

const Project = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    // call("https://jsonplaceholder.typicode.com/posts", "GET", null).then(
    //   (res) => {
    //     setPosts(res.data);
    //   }
    // );
    call("/board/ProjectGet", "GET", null).then((res) => {
      console.log(res);
      setPosts(res.data);
    });
  }, []);

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
      <PostItem project={post} key={post.project_id} />
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

export default Project;
