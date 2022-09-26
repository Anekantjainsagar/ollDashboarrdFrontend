import React from "react";
import SearchSection from "./SearchSection";

const Topbar = ({ getUserData, filterBySearch, setfilterBySearch }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchSection
          filterBySearch={filterBySearch}
          setfilterBySearch={setfilterBySearch}
        />
      </div>
    </>
  );
};

export default Topbar;
