import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SearchSection = ({ filterBySearch, setfilterBySearch }) => {
  return (
    <>
      <div className="topbarSearch">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {filterBySearch?.length > 0 ? (
            <AiOutlineClose
              color="white"
              size={20}
              style={{
                position: "relative",
                right: "-85%",
                zIndex: 9,
                cursor: "pointer",
              }}
              onClick={() => {
                setfilterBySearch("");
              }}
            />
          ) : null}
          <input
            type="text"
            placeholder="Search"
            value={filterBySearch}
            style={{
              width: "100%",
            }}
            onChange={(e) => setfilterBySearch(e.target.value)}
          />
        </div>
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
