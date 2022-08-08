import React from "react";
import Form from "./Form";
import SearchSection from "./SearchSection";

const Topbar = ({ usersData, getUserData }) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form usersData={usersData} getUserData={getUserData} />
        <SearchSection />
      </div>
    </>
  );
};

export default Topbar;
