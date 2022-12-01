import React, { useState } from "react";
import { Card, Col, Divider, Modal, Tag } from "antd";

const PostItem = ({ project }) => {
  const categories = project["category_"].split("/");
  const tags = categories.map((category, idx) => (
    <Tag key={idx}>{category}</Tag>
  ));

  const [modal2Open, setModal2Open] = useState(false);
  return (
    <Col span={8} key={project.project_id}>
      <Card
        title={project.title}
        style={{ height: 300, overflowWrap: "break-word" }}
        hoverable={true}
        onClick={() => setModal2Open(true)}
        extra={project.startdate + " ~ " + project.enddate}
      >
        <Card.Meta description={<div>{tags}</div>}></Card.Meta>
        <br />
        <p>{project.introduction}</p>
      </Card>
      <Modal
        title={project.title}
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>{project.introduction}</p>
      </Modal>
    </Col>
  );
};

export default PostItem;
