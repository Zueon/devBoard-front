import { Tabs } from "antd";
import React from "react";
import MembersList from "./MembersList";

const tabBar = ["방 정보", "자료", "채팅"];

const Tab = () => {
  return (
    <Tabs
      type="card"
      items={tabBar.map((item, i) => {
        const id = String(i + 1);
        return {
          label: item,
          key: id,
          children: <MembersList />,
        };
      })}
    />
  );
};

export default Tab;
