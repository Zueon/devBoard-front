import React from 'react';
import {Descriptions} from 'antd';



const ProfileDetail = ({posts}) => (
  <Descriptions title="회원정보" bordered column={1}>
    <Descriptions.Item label="닉네임">{posts.nickname}</Descriptions.Item>
    <Descriptions.Item label="이름">{posts.name}</Descriptions.Item>
    <Descriptions.Item label="생년월일">{posts.birth}</Descriptions.Item>
    <Descriptions.Item label="성별">{posts.gender}</Descriptions.Item>
    <Descriptions.Item label="주소">{posts.address}</Descriptions.Item>
    {posts.project_board === "" && 
        <Descriptions.Item label="프로젝트Room">
        Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </Descriptions.Item>
    }
    {posts.project_board === "" && 
        <Descriptions.Item label="스터디Room">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
   </Descriptions.Item>
    }
    
   
  </Descriptions>
);
export default ProfileDetail;

