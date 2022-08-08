import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Navbar.css";
import "./css/Topbar.css";
import "./css/usersData.css";
import { BASE_URL } from "../src/Utils/index";
import "./css/floatingData.css";

import Nav from "./Components/Nav";
import Topbar from "./Components/Topbar/Topbar";
import UsersData from "./Components/UsersData/UsersData";

function App() {
  const [data, setdata] = useState();

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
      <Topbar getUserData={getUserData} usersData={data} />
      <UsersData usersData={data} />
    </div>
  );
}

export default App;
