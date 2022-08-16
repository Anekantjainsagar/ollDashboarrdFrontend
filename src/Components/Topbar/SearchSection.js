import React from "react";

const SearchSection = ({ filterBySearch, setfilterBySearch }) => {
  return (
    <>
      <div className="topbarSearch">
        <input
          type="text"
          placeholder="Search"
          value={filterBySearch}
          onChange={(e) => setfilterBySearch(e.target.value)}
        />
        <select name="" id="">
          <option value="Type">Type</option>
          <option value="sales">Sales</option>
          <option value="support">Support</option>
        </select>
      </div>
    </>
  );
};

export default SearchSection;
