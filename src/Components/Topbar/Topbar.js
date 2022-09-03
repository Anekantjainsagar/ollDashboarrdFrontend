import React from "react";
import Form from "./Form";
import SearchSection from "./SearchSection";

const Topbar = ({ getUserData, filterBySearch, setfilterBySearch, sales }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form getUserData={getUserData} sales={sales} />
        <SearchSection
          filterBySearch={filterBySearch}
          setfilterBySearch={setfilterBySearch}
        />
      </div>
    </>
  );
};

export default Topbar;
