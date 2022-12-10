import { Content } from "antd/es/layout/layout";
import React from "react";
import { Option } from "antd/es/mentions";
import { locations } from "../AppConfig";
import { InboxOutlined } from "@ant-design/icons";
import { Input, Form, Select, Button, Upload, Layout } from "antd";

import { useLocation } from "react-router-dom";
import UploadButton from "../components/UploadButton";

const residences = locations.map((loc, idx) => (
  <Option value={loc} key={idx}>
    {loc}
  </Option>
));

const ProfileGet = () => {
  const location = useLocation();
  const post = location["state"]["userInfo"];

  const { mid, address, email, auth, name, nickname, proj, study, gender } =
    post;

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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

              {study && (
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
              <Form.Item label="포토폴리오">
                <Input type="file" />
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
              <a href="/profileUpdate">회원 수정</a>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ProfileGet;
