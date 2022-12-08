import React, { useState } from "react";
import { Input, Form, Select, Button, Upload, List } from "antd";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
import { locations } from "../AppConfig";
import { AuthenticatedLink } from "../services/ApiService";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { call } from "../services/ApiService";
import { useEffect } from "react";

const { API_BASE_URL } = require("../AppConfig");

// List 관련 설정
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

const residences = locations.map((loc, idx) => (
  <Option value={loc} key={idx}>
    {loc}
  </Option>
));

const deletefile = async (filename, idx) => {
  console.log("삭제");
  console.log(filename);
  call(`/file/deleteFile?filename=${filename}`, "DELETE", null).then((res) => {
    console.log(res);
  });
};

const ProfileDetail = () => {
  const [posts, setPosts] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      call(`/auth/getMember`, "GET", null).then((res) => {
        setPosts(res.data.data);
      });
    };

    fetchData();
  }, []);

  const fileList = files.map((item, index) => (
    <List.Item key={index}>
      <AuthenticatedLink
        url={API_BASE_URL + "/file/download?filename=" + item.fileName}
        filename={item.fileName}
      >
        {item.fileName}
      </AuthenticatedLink>
      <CloseOutlined onClick={() => deletefile(item.fileName)} />
    </List.Item>
  ));

  console.log("profileDetail post : ", posts);

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
      <Form.Item label="이메일">
        <span className="ant-form-text">{posts.email}</span>
      </Form.Item>

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
        initialValue={posts.name}
      >
        <Input value={posts.name} />
      </Form.Item>

      <Form.Item label="성별">
        <span className="ant-form-text">{posts.gender}</span>
      </Form.Item>

      {posts.proj !== "null" ? (
        <Form.Item label="프로젝트">
          <span className="ant-form-text">{posts["proj"]["title"]}</span>
        </Form.Item>
      ) : (
        ""
      )}
      {posts.project_board === "" && (
        <Form.Item label="스터디">
          <span className="ant-form-text">{posts.study_board}</span>
        </Form.Item>
      )}

      <Form.Item
        name="select"
        label="Select"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select your country!",
          },
        ]}
      >
        <Select placeholder="주소" initialvalues={posts.address}>
          {residences}
        </Select>
      </Form.Item>
      <Form.Item label="포토폴리오">
        <span className="ant-form-text">{fileList}</span>
        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        ></Form.Item>
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
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
  );
};

export default ProfileDetail;
