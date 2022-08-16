import React, { useEffect, useState } from "react";
import "./css/Navbar.css";
import "./css/Topbar.css";
import "./css/usersData.css";
import "./css/floatingData.css";

import Nav from "./Components/Nav";
import Topbar from "./Components/Topbar/Topbar";
import UsersData from "./Components/UsersData/UsersData";
import { getUserData } from "./Services/userService";

function App() {
  const [data, setdata] = useState();
  const [filterBySearch, setfilterBySearch] = useState();
  const [filterByStage, setfilterByStage] = useState("");
  const [filterByStatus, setfilterByStatus] = useState();
  const [filterByClass, setfilterByClass] = useState();
  //Use tab for camelCase in states
  const [filter, setFilter] = useState({ stage: "", status: "", class: "" });

  getUserData((err, res) => {
    if (err) {
      return console.log(err);
    }
    if (res !== null) {
      setdata(res.data.reverse());
    }
  });

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "90%",
        padding: "1.5rem",
        boxSizing: "border-box",
      }}
    >
      <Nav />
      <Topbar
        getUserData={getUserData}
        usersData={data}
        filterBySearch={filterBySearch}
        setfilterBySearch={setfilterBySearch}
      />
      <UsersData
        getUserData={getUserData}
        usersData={data}
        filterBySearch={filterBySearch}
        filterByClass={filterByClass}
        setfilterByClass={setfilterByClass}
        filterByStatus={filterByStatus}
        setfilterByStatus={setfilterByStatus}
        filterByStage={filterByStage}
        setfilterByStage={setfilterByStage}
      />
    </div>
  );
}

export default App;
