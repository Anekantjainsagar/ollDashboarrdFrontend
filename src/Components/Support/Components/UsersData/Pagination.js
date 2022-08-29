import React from "react";
import "../../../../css/pagination.css";

const Pagination = ({ page, setpage, NoOfUsers }) => {
  return (
    <div className="div">
      {NoOfUsers <= page * 10 ? null : (
        <button
          onClick={() => {
            setpage(page + 1);
          }}
        >
          Load more...
        </button>
      )}
    </div>
  );
};

export default Pagination;
