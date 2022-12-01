import React from "react";
import { Layout, Row } from "antd";

import Paging from "../../components/Paging";
import Profile from "../../components/Profile";
import PostItem from "../../components/PostItem";

import { call } from "../../services/ApiService";

const { Content } = Layout;

const List = ({ posts }) => {
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
            <Row gutter={[16, 30]}>{}</Row>
          </div>
          <Paging />
        </Content>
      </Layout>
      <Profile />
    </Layout>
  );
};

export default List;
