import { Tabs } from "antd";
import React from "react";

const Tab = () => {
  return (
    <Tabs
      type="card"
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `카테고리 ${id}`,
          key: id,
          children: `내용 ${id}`,
        };
      })}
    />
  );
};

export default Tab;
