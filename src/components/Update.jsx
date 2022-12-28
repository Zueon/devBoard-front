import React from "react";
import { locations } from "../AppConfig";
import { Button, Form, Radio, Select, Input, DatePicker } from "antd";
import { Content } from "antd/es/layout/layout";
import { call } from "../services/ApiService";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const nickname = sessionStorage.getItem("NICKNAME");
const mid = sessionStorage.getItem("MID");

const { Option } = Select;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

const tagList = [
  "JAVA",
  "Python",
  "JavaScript",
  "HTML/CSS",
  "C/C++",
  "C#",
  "백엔드",
  "프론트엔드",
  "네트워크",
  "AWS",
];

const tags = tagList.map((tag, idx) => (
  <Option value={tag} key={idx}>
    {tag}
  </Option>
));

const residences = locations.map((loc, idx) => (
  <Option value={loc} key={idx}>
    {loc}
  </Option>
));

const Update = ({ pid }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  const type = path === "/study/create" ? "STUDY" : "PROJECT";

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];
    const values = {
      ...fieldsValue,
      enddate: rangeValue[1].format("YYYY-MM-DD"),
      startdate: rangeValue[0].format("YYYY-MM-DD"),
      category_: fieldsValue["category_"].join("/"),
      nickname: nickname,
      hostId: mid,
      type: type,
    };

    call("/project", "POST", values).then((res) => {
      console.log(res);
      navigate(`/success?type=${type}`);
    });
  };

  useEffect(() => {
    call(`/project/${pid}`, "GET").then((res) => {
      console.log(res);
      setProject(res.data.data);
    });
  }, []);

  const [project, setProject] = useState({});

  return (
    <Content style={{ padding: 20 }}>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <Form.Item name="title" label="방 제목">
          <Input placeholder={project.title} />
        </Form.Item>

        <Form.Item name="public_" label="공개 여부">
          <Radio.Group>
            <Radio.Button value="공개">공개</Radio.Button>
            <Radio.Button value="비공개" checked>
              비공개
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="category_" label="태그">
          <Select mode="multiple" placeholder={project.category_}>
            {tags}
          </Select>
        </Form.Item>

        <Form.Item name="location_" label="지역">
          <Select
            defaultValue={project.location_}
            placeholder={project.location_}
          >
            {residences}
          </Select>
        </Form.Item>

        {type === "PROJECT" ? (
          <Form.Item name="range-picker" label="기간" {...rangeConfig}>
            <RangePicker />
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item
          name="introduction"
          label="Intro"
          initialValue={project.introduction}
        >
          <Input.TextArea
            showCount
            maxLength={500}
            style={{ height: 200 }}
            initialValue={project.introduction}
            placeholder={project.introduction}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            수정
          </Button>
          <Button
            style={{ margin: "10px" }}
            onClick={() => {
              call(`/project`, "DELETE").then((res) => {
                console.log(res);
              });
            }}
          >
            프로젝트 삭제
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};
export default Update;
