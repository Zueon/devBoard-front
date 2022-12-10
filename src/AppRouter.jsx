import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Nav from "./components/Nav";

import "./index.css";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Create from "./components/Create";
import Success from "./routes/Success";

import PostList from "./components/PostList";
import TestPage from "./components/TestPage";
import ProfileGet from "./routes/ProfileGet";
import Workspace from "./routes/Workspace";
import { call } from "./services/ApiService";

import Post from "./routes/Post";
import UploadFiles from "./components/UploadFiles";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          {["/project", "/study"].map((path, index) => (
            <Route path={path} element={<Post />} key={index} />
          ))}
          {["/project/create", "/study/create"].map((path, index) => (
            <Route path={path} element={<Create />} key={index} />
          ))}

          <Route path="/mypage" element={<ProfileGet />} />
          <Route path="/myWorkspace" element={<Workspace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/test" element={<UploadFiles />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
