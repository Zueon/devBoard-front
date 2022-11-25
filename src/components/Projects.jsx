import React from "react";

const Projects = ({ projects, loading }) => {
  return (
    <div>
      {loading && <div>LOADING</div>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
