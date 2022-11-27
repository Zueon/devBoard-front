import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import Login from "./routes/Login";
import CreateProject from "./routes/project/CreateProject";
import ProjectList from "./routes/project/ProjectList";
import Signup from "./routes/Signup";
import StudyList from "./routes/study/StudyList";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/project/list" element={<ProjectList />} />
        <Route path="/project/create" element={<CreateProject />} />
        <Route path="/study/list" element={<StudyList />} />
      </Routes>
    </div>
  );
};

export default App;
