import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import Login from "./routes/Login";
import ProjectList from "./routes/project/ProjectList";
import Signup from "./routes/Signup";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/project/list" element={<ProjectList />} />
      </Routes>
    </div>
  );
};

export default App;
