import React from "react";

const Projects = ({ posts, loading }) => {
  return (
    <div>
      {loading && <div>LOADING</div>}
      <ul>
        {posts.map((project) => (
          <li key={project.project_id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
