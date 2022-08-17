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
  var [filterBySearch, setfilterBySearch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage, setuserPerPage] = useState(6);
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

  const [filteredData, setfilteredData] = useState(data);
  useEffect(() => {
    var searchFilter = data
      ?.filter((e) => {
        if (filterBySearch !== undefined && filterBySearch !== "") {
          if (isNaN(filterBySearch) === true) {
            if (e.name.toLowerCase().includes(filterBySearch)) {
              return e;
            }
          } else {
            filterBySearch = filterBySearch.toString();

            if (filterBySearch.length <= data.length.toString().length) {
              return e?.id.toString().includes(filterBySearch);
            } else if (filterBySearch > data.length) {
              return e?.phone.toString().includes(filterBySearch);
            }
          }
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (filter.stage !== "") {
          if (filter.stage == "all") {
            return e;
          } else {
            return e.stage === filter.stage;
          }
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (filter.status !== "") {
          if (filter.status == "all") {
            return e;
          } else {
            return e.status === filter.status;
          }
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (filter.class !== "") {
          if (filter.class == "all") {
            return e;
          } else {
            return (
              e.batchDetails.type + " " + e.batchDetails.mode === filter.class
            );
          }
        } else {
          return e;
        }
      });
    setfilteredData(searchFilter);
  }, [filterBySearch, data, filter]);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = filteredData?.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        padding: "1.5rem",
        boxSizing: "border-box"
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
        usersData={currentUsers}
        filterBySearch={filterBySearch}
        filter={filter}
        setfilter={setFilter}
        usersPerPage={userPerPage}
        totalUsers={filteredData?.length}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
