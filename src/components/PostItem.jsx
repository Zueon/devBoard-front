import React, { useState } from "react";
import { Card, Col, Modal, Tag } from "antd";

const PostItem = ({ project }) => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <Col span={8} key={project.id}>
      <Card
        title={project.title}
        style={{ height: 200 }}
        hoverable={true}
        onClick={() => setModal2Open(true)}
      >
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        {project.body}
      </Card>
      <Modal
        title={project.title}
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>{project.body}</p>
      </Modal>
    </Col>
  );
};

export default PostItem;
