import React, { useEffect, useState } from "react";
import "./css/Navbar.css";
import "./css/Topbar.css";
import "./css/usersData.css";
import "./css/floatingData.css";

import Nav from "./Components/Nav";
import Topbar from "./Components/Topbar/Topbar";
import axios from "axios";
import { BASE_URL } from "./Utils";
import UsersData from "./Components/UsersData/UsersData";

function App() {
  const [data, setdata] = useState();
  const [filterBySearch, setfilterBySearch] = useState();
  const [filterByStage, setfilterByStage] = useState("");
  const [filterByStatus, setfilterByStatus] = useState();
  const [filterByClass, setfilterByClass] = useState();
  //Use tab for camelCase in states
  const [filter, setFilter] = useState({ stage: "", status: "", class: "" });

  const getUserData = () => {
    axios.get(`${BASE_URL}/getUser`).then((res) => {
      setdata(res.data.reverse());
    });
  };

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
