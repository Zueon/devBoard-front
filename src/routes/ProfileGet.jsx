import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileDetail from "../components/ProfileDetail";

const ProfileGet = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/member/getMember/test2",
      );
      setPosts(response.data);
    };

    fetchData();
  }, []);
  return(
    <div className="profile">
        <div>
            <ProfileDetail posts={posts}/>
            <div>
                <a href="/profileDelete">회원 탈퇴</a>
                <a href="/profileUpdate">회원 수정</a>
            </div>
        </div>
    </div>
  );
}
export default ProfileGet;