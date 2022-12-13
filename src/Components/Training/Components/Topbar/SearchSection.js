import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SearchSection = ({ filter, setFilter }) => {
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
          {filter?.value?.length > 0 ? (
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
                setFilter({ ...filter, value: "" });
              }}
            />
          ) : null}
          <input
            type="text"
            placeholder="Search"
            value={filter?.value}
            style={{
              width: "100%",
            }}
            onChange={(e) => setFilter({ ...filter, value: e.target.value })}
          />
        </div>
      </div>
    </>
  );
};

export default SearchSection;
