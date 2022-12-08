import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ProfileDetail from "../components/ProfileDetail";
import { call } from "../services/ApiService";

const ProfileGet = () => {
  return (
    <Layout>
      <Layout>
        <Content>
          <div style={{ margin: "auto", width: "75%", height: "100%" }}>
            <ProfileDetail />
            <div>
              <a href="/profileDelete">회원 탈퇴</a>
              <a href="/profileUpdate">회원 수정</a>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProfileGet;
