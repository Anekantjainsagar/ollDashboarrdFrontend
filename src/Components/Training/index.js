import React, { useEffect, useState } from "react";
import "./css/Navbar.css";
import "./css/Topbar.css";
import "./css/usersData.css";
import "./css/floatingData.css";
import "./css/Modal.css";
import "./css/pagination.css";
import "./css/filters.css";

import Nav from "./Components/Nav";
import Topbar from "./Components/Topbar/Topbar";
import axios from "axios";
import TRAINING_BACKEND from "./utils";
import UsersData from "./Components/UsersData/UsersData";

function Training({ sales }) {
  const [filter, setFilter] = useState({ stage: "all", value: "" });
  const [page, setpage] = useState(1);
  //Use tab for camelCase in states
  const [noOfUsers, setnoOfUsers] = useState();
  const [requirementsData, setRequirementsData] = useState([]);
  const [filteredData, setfilteredData] = useState(requirementsData);

  const getRequirements = () => {
    axios
      .get(`${TRAINING_BACKEND}/getRequirements`)
      .then((res) => {
        setRequirementsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequirements();
  }, []);

  useEffect(() => {
    var searchFilter = requirementsData.filter((e) => {
      if (filter.stage == "all") {
        return e;
      } else {
        return e.stage.toLowerCase().includes(filter.stage.toLowerCase());
      }
    });
    // ?.filter((e) => {
    //   if (filter.stage === "") {
    //     return e;
    //   } else {
    //     return e.course.toLowerCase().includes(filter.value.toLowerCase());
    //   }
    // });
    setfilteredData(searchFilter);
  }, [filter, requirementsData]);

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        padding: "1.5rem",
        boxSizing: "border-box",
      }}
    >
      <Nav sales={sales} />
      <Topbar
        getRequirements={getRequirements}
        sales={sales}
        filter={filter}
        setFilter={setFilter}
      />
      <UsersData
        getRequirements={getRequirements}
        requirementsData={requirementsData}
        filteredData={filteredData}
        usersData={filteredData}
        filter={filter}
        sales={sales}
        page={page}
        setpage={setpage}
        setfilter={setFilter}
        noOfUsers={noOfUsers}
      />
    </div>
  );
}

export default Training;
