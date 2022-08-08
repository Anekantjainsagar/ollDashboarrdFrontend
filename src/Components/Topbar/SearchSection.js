import React from "react";

const SearchSection = () => {
  return (
    <>
      <div className="topbarSearch">
        <input type="text" placeholder="Search" />
        <select name="" id="">
          <option value="Type">Type</option>
          <option value="inactive">Inactive</option>
          <option value="active">Active</option>
        </select>
      </div>
    </>
  );
};

export default SearchSection;
