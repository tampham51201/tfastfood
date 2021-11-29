import React, { useState } from "react";

const Pagination = ({ postsPage, totalPages, paginate }) => {
  const pageNumber = [];
  const [indexPage, setIndexPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPages / postsPage); i++) {
    pageNumber.push(i);
  }

  const handleNext = () => {
    const newIndexPage =
      indexPage === pageNumber.length ? indexPage : indexPage + 1;
    paginate(newIndexPage);
    setIndexPage(newIndexPage);
  };

  const handlePrev = () => {
    const newIndexPage = indexPage === 1 ? indexPage : indexPage - 1;
    paginate(newIndexPage);
    setIndexPage(newIndexPage);
  };

  return (
    <ul className="pagination">
      <li className="pagination__item" onClick={handlePrev}>
        <i className="bx bxs-chevrons-left"></i>
      </li>
      {pageNumber.map((item, index) => (
        <li
          className={`pagination__item ${item === indexPage ? "active" : ""}`}
          onClick={() => {
            setIndexPage(item);
            paginate(item);
          }}
          key={index}
        >
          {item}
        </li>
      ))}
      <li className="pagination__item" onClick={handleNext}>
        <i className="bx bxs-chevrons-right"></i>
      </li>
    </ul>
  );
};

export default Pagination;
