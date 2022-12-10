import { Content } from "antd/es/layout/layout";
import React,{useState} from "react";
import { Option } from "antd/es/mentions";
import { locations } from "../AppConfig";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Input, Form, Select, Button, Upload, Layout, List, message} from "antd";
import { call, AuthenticatedLink } from "../services/ApiService";

import { useLocation } from "react-router-dom";

const { API_BASE_URL} = require('../AppConfig');

const residences = locations.map((loc, idx) => (
  <Option value={loc} key={idx}>
    {loc}
  </Option>
));

const deletefile = async (fid, fileName) => {
  console.log("삭제");
  console.log(fid);
    call(
      `/file/deleteFile?filename`,"DELETE",{fid,fileName}
    ).then((res)=>{
      console.log(res);
    });
    
}







const ProfileGet = () => {
  const location = useLocation();
  const post = location["state"]["userInfo"];
  const [files, setFiles] = useState([]);

  const clg = console.log(post);
  const { mid, address, email, auth, name, nickname, infoFileDTO, proj, study, gender } =
    post;

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const fileChangedHandler = event =>{
    setFiles(event.target.files);
    
  }

  const onFinish = (values) => {
    console.log(files);
    const formData = new FormData();
  const data = {
    "name" : values.name,
    "address" : values.address,
    "flag" : true
  }
  const blob = new Blob([JSON.stringify(data)], {type:"application/json"})
  formData.append("data",blob);
  formData.append("files",files);
  for(const [key, value] of formData.entries()){
    console.log(key, value);
  }
  
  const response = call("/auth/update","PUT",{...formData, ...data})
  console.log(response);
  };

  

  return (
    <Layout>
      <Layout>
        <Content style={{ marginTop: "20px" }}>
          <div style={{ margin: "auto", width: "75%", height: "100%" }}>
            <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
              <Form.Item
                {...formItemLayout}
                name="name"
                label="이름"
                rules={[
                  {
                    required: true,
                    message: "Please input your name",
                  },
                ]}
                initialValue={name}
              >
                <Input value={name} />
              </Form.Item>

              <Form.Item label="이메일">
                <span className="ant-form-text">{email}</span>
              </Form.Item>

              <Form.Item label="성별">
                <span className="ant-form-text">{gender}</span>
              </Form.Item>

              {proj && (
                <Form.Item label="프로젝트">
                  <span className="ant-form-text">{proj["title"]}</span>
                </Form.Item>
              )}

              <Form.Item
                name="address"
                label="주소"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your country!",
                  },
                ]}
              >
                <Select placeholder="주소" defaultValue={address}>
                  {residences}
                </Select>
              </Form.Item>
              <Form.Item label="포토폴리오" name="files">
                {infoFileDTO && infoFileDTO.map((item,index)=>{
                  return(
                    <List.Item key={index} style={{margin:"10px"}}>
                    <AuthenticatedLink url={API_BASE_URL+'/file/download?filename='+item.fileName} filename={item.fileName}>
                      {item.fileName}
                    </AuthenticatedLink>
                    <CloseOutlined onClick={()=>deletefile(item.fid,item.fileName)} />
                    </List.Item>
                  )
                })}
              </Form.Item>
              <Form.Item>
                <input type="file" multiple name="files" onChange={fileChangedHandler}/>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Button type="primary" htmlType="submit">
                  회원 수정
                </Button>
              </Form.Item>
            </Form>
            <div>
              <a href="/profileDelete">회원 탈퇴</a>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProfileGet;
