import React from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axiosInstance from "./axios";

const ImageUpload = () => {
  const props = {
    name: 'file',
    action: 'http://localhost:8000/api/users/me/avatar',
    headers: {
      authorization: "Bearer " + localStorage.getItem('access_token'),
    },
    method: "patch",
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default ImageUpload;
