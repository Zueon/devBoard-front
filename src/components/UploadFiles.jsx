import React, { useEffect, useState } from "react";
import { Progress, Button, List, Alert } from "antd";
import { uploadFiles, getFiles } from "../services/upload-files";
import { UploadOutlined } from "@ant-design/icons";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  const selectFile = (e) => {
    setSelectedFiles(e.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setCurrentFile(currentFile);

    uploadFiles(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((res) => {
        setMessage(res.data.message);
        return getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  useEffect(() => {
    getFiles().then((res) => {
      setFileInfos(res.data);
    });
  }, []);

  return (
    <div>
      {message !== "" ? <Alert message={message}></Alert> : ""}
      <div
        style={{
          height: 500,
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <List
          size="large"
          header={<div>FILE LIST</div>}
          bordered
          style={{ overflow: "scroll" }}
        >
          {fileInfos &&
            fileInfos.map((file, index) => (
              <List.Item className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </List.Item>
            ))}
        </List>
      </div>
      {currentFile && (
        <div className="progress">
          <Progress percent={progress} style={{ width: progress + "%" }}>
            {progress}%
          </Progress>
        </div>
      )}
      <div style={{ padding: "10px 16px" }}>
        <Button>
          <input type="file" onChange={selectFile} />
        </Button>

        <Button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadFiles;
