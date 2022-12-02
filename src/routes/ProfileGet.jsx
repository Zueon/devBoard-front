import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ProfileDetail from "../components/ProfileDetail";
import { call } from "../services/ApiService";

const nickname = localStorage.getItem("NICKNAME");
const ProfileGet = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      call(
        `/auth/getMember/${nickname}`,"GET",null
      ).then((res)=>{
        setPosts(res.data);
        console.log(1,res.data);
      });
    };

    fetchData();
  }, []);
  return(
    <Layout>
      <Layout>
        <Content>
        <div style={{margin:"auto",width:"75%", height:"100%"}}>
            <ProfileDetail posts={posts}/>
            <div>
                <a href="/profileDelete">회원 탈퇴</a>
                <a href="/profileUpdate">회원 수정</a>
            </div>
        </div>
        </Content>
      </Layout>
    </Layout>

  );
}
export default ProfileGet;