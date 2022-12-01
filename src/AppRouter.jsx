import { Layout } from "antd";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Nav from "./components/Nav";
import Project from "./routes/project/Project";
import "./index.css";
import Study from "./routes/Study";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Create from "./components/Create";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Nav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/create" element={<Create />} />
          <Route path="/study" element={<Study />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
