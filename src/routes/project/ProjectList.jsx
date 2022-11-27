import axios from "axios";
import React, { useEffect, useState } from "react";
import Paging from "../../components/Paging";

import Projects from "../../components/Projects";

const ProjectList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/board/ProjectGet"
      );
      setPosts(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <div>
      <h1>프로젝트 리스트</h1>
      <a href="/project/create">프로젝트 생성</a>
      <Projects posts={currentPosts(posts)} loading={loading} />
      <Paging
        itemsCountPerPage={postsPerPage}
        totalItemsCount={posts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProjectList;
