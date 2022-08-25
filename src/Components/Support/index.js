import React, { useEffect, useState } from "react";
import "../../css/Navbar.css";
import "../../css/Topbar.css";
import "../../css/usersData.css";
import "../../css/floatingData.css";

import Nav from "./Components/Nav";
import Topbar from "./Components/Topbar/Topbar";
import axios from "axios";
import { BASE_URL } from "../../Utils/index";
import UsersData from "./Components/UsersData/UsersData";

function Support({ sales }) {
  const [data, setdata] = useState();
  var [filterBySearch, setfilterBySearch] = useState();
  const [filter, setFilter] = useState({ stage: "", status: "", class: "" });
  const [filteredData, setfilteredData] = useState(data);
  const [page, setpage] = useState(1);
  //Use tab for camelCase in states
  const [noOfUsers, setnoOfUsers] = useState();

  const getUserData = () => {
    axios
      .get(`${BASE_URL}/getUser?page=${page}&size=${page * 10}`)
      .then((res) => {
        setdata(res.data.users);
        setnoOfUsers(res.data.NoOfUsers - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, [page]);

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
            if (filterBySearch.length > e?.id.toString().length) {
              if (e?.phone.toString().includes(filterBySearch)) {
                return e;
              }
            } else if (e?.id.toString().includes(filterBySearch)) {
              return e;
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

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        padding: "1.5rem",
        boxSizing: "border-box",
      }}
    >
      <Nav />
      <Topbar
        getUserData={getUserData}
        sales={sales}
        filterBySearch={filterBySearch}
        setfilterBySearch={setfilterBySearch}
      />
      <UsersData
        getUserData={getUserData}
        usersData={filteredData}
        filterBySearch={filterBySearch}
        filter={filter}
        sales={sales}
        page={page}
        setpage={setpage}
        setfilter={setFilter}
        noOfUsers={noOfUsers}
        setdata={setdata}
      />
    </div>
  );
}

export default Support;