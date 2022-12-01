import React from "react";
import { NotificationOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";

const RedBadge = ({ status }) => (
  <Space>
    <Badge dot={status}>
      <NotificationOutlined
        style={{
          fontSize: 16,
        }}
      />
    </Badge>
    <Badge>알람</Badge>
  </Space>
);
export default RedBadge;
