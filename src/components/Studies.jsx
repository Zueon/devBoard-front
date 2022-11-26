import React from "react";

const Studies = ({ posts, loading }) => {
  return (
    <div>
      {loading && <div>LOADING</div>}
      <ul>
        {posts.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Studies;
