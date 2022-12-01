import React, { useState } from "react";
import { Card, Col, Modal, Tag } from "antd";

const PostItem = ({ project }) => {
  const enddate = project.enddate;
  const date = new Date(enddate);
  const month = date.getMonth();
  const day = date.getDay();

  const [modal2Open, setModal2Open] = useState(false);
  return (
    <Col span={8} key={project.project_id}>
      <Card
        title={project.title}
        style={{ height: 300 }}
        hoverable={true}
        onClick={() => setModal2Open(true)}
        extra={project.enddate}
      >
        {project.introduction}
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
