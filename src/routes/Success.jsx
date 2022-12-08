import React from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const button =
    type === "계정"
      ? [
          <Button key="login" type="primary">
            로그인하기
          </Button>,
          <Button key="project">프로젝트 리스트로</Button>,
          <Button key="study">스터디 리스트로</Button>,
        ]
      : [
          <Button type="primary" key="console">
            {type} 방으로
          </Button>,
          <Button key="buy">{type} 목록으로</Button>,
        ];

  return (
    <Result
      status="success"
      title={type + " 생성을 완료하였습니다!"}
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={button}
    />
  );
};
export default Success;
