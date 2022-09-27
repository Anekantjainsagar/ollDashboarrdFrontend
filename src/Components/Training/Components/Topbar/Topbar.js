import React from "react";
import SearchSection from "./SearchSection";
import Form from "./Form";

const Topbar = ({ getUserData, filterBySearch, setfilterBySearch }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form />
        <SearchSection
          filterBySearch={filterBySearch}
          setfilterBySearch={setfilterBySearch}
        />
      </div>
    </>
  );
};

export default Topbar;
