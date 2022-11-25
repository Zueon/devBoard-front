import axios from "axios";
import React, { useEffect, useState } from "react";
import Paging from "../../components/Paging";

import Projects from "../../components/Projects";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projsPerPage, setProjsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios({
        method: "get",
        url: "https://jsonplaceholder.typicode.com/posts",
      });

      console.log(response);
      setProjects(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const idxOfLast = currentPage * projsPerPage;
  const idxOfFirst = idxOfLast - projsPerPage;
  const currProjs = (projects) => {
    let currProjs = 0;
    currProjs = projects.slice(idxOfFirst, idxOfLast);
    return currProjs;
  };

  return (
    <div>
      <Projects projects={currProjs(projects)} loading={loading} />
      <Paging
        itemsCountPerPage={projsPerPage}
        totalItemsCount={projects.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProjectList;
