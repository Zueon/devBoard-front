import React, { useState } from "react";
import { DatePicker, Button, Cascader, Form, Input, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { locations } from "../AppConfig";
import { call, signup } from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const residences = locations.map((loc, idx) => (
  <Option value={loc} key={idx}>
    {loc}
  </Option>
));

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (formfields) => {
    const values = {
      ...formfields,
      birth: formfields["birth"].format("YYYY-MM-DD"),
    };

    signup(values);
  };

  return (
    <Content
      style={{
        margin: "0 auto",
        paddingTop: 50,
        width: 500,
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "+82",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "올바른 이메일 형식을 입력하세요",
            },
            {
              required: true,
              message: "이메일을 입력하세요",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력하세요",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호를 확인하세요",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "닉네임을 입력하세요",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birth"
          label="생년월일"
          rules={[
            {
              required: true,
              message: "성별을 입력하세요",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="address"
          label="거주지역"
          rules={[
            {
              required: true,
              message: "주소를 입력하세요",
            },
          ]}
        >
          <Select>{residences}</Select>
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "성별을 입력하세요",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="M">Male</Option>
            <Option value="F">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};
export default Register;
