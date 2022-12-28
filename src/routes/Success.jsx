import React from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const navigate = useNavigate();

  const move = () => {
    const path = `/${type}`;
    navigate(path);
  };

  const button =
    type === "계정"
      ? [
          <Button key="login" type="primary" onClick={() => navigate("/login")}>
            로그인하기
          </Button>,
          <Button key="project" onClick={move}>
            프로젝트 리스트로
          </Button>,
          <Button key="study" onClick={move}>
            스터디 리스트로
          </Button>,
        ]
      : [
          <Button type="primary" key="console">
            {type} 방으로
          </Button>,
          <Button key="buy" onClick={move}>
            {type} 목록으로
          </Button>,
        ];

  return (
    <Result
      status="success"
      title={type + " 생성을 완료하였습니다!"}
      extra={button}
    />
  );
};
export default Success;
