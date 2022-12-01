import { Layout } from "antd";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Nav from "./components/Nav";

import "./index.css";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Create from "./components/Create";
import Success from "./routes/Success";

import PostList from "./components/PostList";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          {["/project", "/study"].map((path, index) => (
            <Route path={path} element={<PostList />} key={index} />
          ))}
          <Route path="/project/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
