import React from "react";
import { StarOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },

  defaultFileList: [],
  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: "Download",
    showRemoveIcon: true,
    removeIcon: (
      <StarOutlined
        onClick={(e) => console.log(e, "custom removeIcon event")}
      />
    ),
  },
};

const UploadButton = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);
export default UploadButton;
