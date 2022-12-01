import React from "react";
import { locations } from "../AppConfig";
import { Button, Form, Radio, Select, Input, DatePicker } from "antd";
import { Content } from "antd/es/layout/layout";
import { call } from "../services/ApiService";

import { useNavigate } from "react-router-dom";

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

const Create = () => {
  const navigate = useNavigate();

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];
    const values = {
      ...fieldsValue,
      enddate: rangeValue[1].format("YYYY-MM-DD"),
      startdate: rangeValue[0].format("YYYY-MM-DD"),
      category_: fieldsValue["category_"].join("/"),
    };

    call("/board/ProjectCreate", "POST", values).then((res) => {
      console.log(res);
      const type = "프로젝트";
      navigate("/success", { state: { type: type } });
    });
  };

  return (
    <Content style={{ padding: 50 }}>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="프로젝트 방 이름"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="public_"
          label="공개 여부"
          rules={[
            {
              required: true,
              message: "공개 여부를 설정하세요!",
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="공개">공개</Radio.Button>
            <Radio.Button value="비공개">비공개</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="category_"
          label="태그"
          rules={[
            {
              required: true,
              message: "태그를 선택하세요",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="태그를 선택하세요">
            {tags}
          </Select>
        </Form.Item>

        <Form.Item
          name="location_"
          label="지역"
          rules={[
            {
              required: true,
              message: "주소를 입력하세요",
            },
          ]}
        >
          <Select>{residences}</Select>
        </Form.Item>

        <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
          <RangePicker />
        </Form.Item>

        <Form.Item
          name="introduction"
          label="Intro"
          rules={[
            {
              required: true,
              message: "Please input Intro",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={500} style={{ height: 200 }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};
export default Create;
