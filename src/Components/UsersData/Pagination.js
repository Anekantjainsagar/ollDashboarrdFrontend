import React from "react";
import '../../css/pagination.css'

const Pagination = ({ usersPerPage, totalUsers, setCurrentPage }) => {

  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul
        className="pagination"
      >
        {pageNumbers.map((number, i) => {
          return (
            <li
              key={i}
              className="pageItem"
              onClick={() => {
                setCurrentPage(number);
              }}
            >
              {number}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
