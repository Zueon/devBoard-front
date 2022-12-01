import React, { useState } from "react";
import { Card, Col, Divider, Modal, Tag } from "antd";

const PostItem = ({ post }) => {
  const categories = post["category_"].split("/");
  const tags = categories.map((category, idx) => (
    <Tag key={idx}>{category}</Tag>
  ));
  const duration = post.startdate ? `${post.startdate} ~ ${post.enddate}` : "";

  const [modal2Open, setModal2Open] = useState(false);
  return (
    <Col span={8} key={post.post_id}>
      <Card
        title={post.title}
        style={{ height: 300, overflowWrap: "break-word" }}
        hoverable={true}
        onClick={() => setModal2Open(true)}
        extra={duration}
      >
        <Card.Meta description={<div>{tags}</div>}></Card.Meta>
        <br />
        <p>{post.introduction}</p>
      </Card>
      <Modal
        title={post.title}
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>{post.introduction}</p>
      </Modal>
    </Col>
  );
};

export default PostItem;
