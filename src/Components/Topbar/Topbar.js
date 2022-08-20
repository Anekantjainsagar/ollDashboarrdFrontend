import React from "react";
import Form from "./Form";
import SearchSection from "./SearchSection";

const Topbar = ({
  getUserData,
  filterBySearch,
  setfilterBySearch,
}) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form getUserData={getUserData} />
        <SearchSection
          filterBySearch={filterBySearch}
          setfilterBySearch={setfilterBySearch}
        />
      </div>
    </>
  );
};

export default Topbar;
