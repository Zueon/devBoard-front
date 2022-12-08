import React, { useState } from "react";
import { Button, Card, Col, Modal, Tag, message } from "antd";
import { call } from "../services/ApiService";

const mid = sessionStorage.getItem("MID");
const nickname = sessionStorage.getItem("NICKNAME");

const PostItem = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: `참가 신청을 전송하였습니다!`,
    });
  };

  const categories = post["category_"].split("/");

  const tags = categories.map((category, idx) => (
    <Tag key={idx}>{category}</Tag>
  ));

  const duration = post.startdate ? `${post.startdate} ~ ${post.enddate}` : "";

  const apply = () => {
    call(`/board/project/${post.pid}/${mid}`, "POST", {
      sender: nickname,
      content: `${nickname}이 신청요청을 보냈습니다!`,
      type: "APPLY",
    }).then((res) => {
      console.log(res);
    });

    success();
    setOpen(false);
  };

  return (
    <Col span={8} key={post.pid}>
      {contextHolder}
      <Card
        title={post.title}
        style={{ height: 300, overflowWrap: "break-word" }}
        hoverable={true}
        onClick={() => setOpen(true)}
        extra={duration}
      >
        <Card.Meta description={<div>{tags}</div>}></Card.Meta>
        <br />
        <p>{post.introduction}</p>
      </Card>

      <Modal
        title={post.title}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[
          <Button
            type="primary"
            onClick={apply}
            disabled={
              post.hostId == sessionStorage.getItem("MID") ? true : false
            }
          >
            신청하기
          </Button>,
          <Button onClick={() => setOpen(false)}>닫기</Button>,
        ]}
      >
        <p>{post.introduction}</p>
      </Modal>
    </Col>
  );
};

export default PostItem;
