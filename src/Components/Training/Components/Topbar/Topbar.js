import React from "react";
import SearchSection from "./SearchSection";
import Form from "./Form";

const Topbar = ({ getRequirements, filter, setFilter }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form getRequirements={getRequirements} />
        <SearchSection filter={filter} setFilter={setFilter} />
      </div>
    </>
  );
};

export default Topbar;
