import React, { useState } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({
  itemsCountPerPage,
  totalItemsCount,
  setCurrentPage,
  currentPage,
}) => {
  return (
    <Pagination
      activePage={currentPage} // 현재 페이지
      itemsCountPerPage={itemsCountPerPage} // 한 페이지 당 보여줄 리스트 아이템 개수
      totalItemsCount={totalItemsCount} // 총 아이템의 개수
      pageRangeDisplayed={5} // paginator 내에서 보여줄 페이지 범위
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setCurrentPage} // 페이지가 바뀔 때 핸들링해줄 함수
    />
  );
};

export default Paging;
