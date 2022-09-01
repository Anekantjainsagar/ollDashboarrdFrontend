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
  const [filterBySearch, setfilterBySearch] = useState();
  const [filter, setFilter] = useState({ stage: "", priority: "" });
  const [filteredData, setfilteredData] = useState(data);
  const [page, setpage] = useState(1);
  //Use tab for camelCase in states
  const [noOfUsers, setnoOfUsers] = useState();

  const [templateMsg, settemplateMsg] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzIyYzViYi1kYzQwLTRmODctYjZiMi1iMjMyOTQyMjBiOGUiLCJ1bmlxdWVfbmFtZSI6ImluZm9Ab2xsLmNvIiwibmFtZWlkIjoiaW5mb0BvbGwuY28iLCJlbWFpbCI6ImluZm9Ab2xsLmNvIiwiYXV0aF90aW1lIjoiMDgvMDEvMjAyMiAwNDowMDo1NiIsImRiX25hbWUiOiIxMTUwNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.k89dQ0gkjcZ3T8VYDz6FIbr4sisaSiSTvjLZ7FhLEAc",
      },
    };

    fetch(
      "https://live-server-11507.wati.io/api/v1/getMessageTemplates?pageSize=13&pageNumber=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        settemplateMsg(response.messageTemplates);
      })
      .catch((err) => console.error(err));
  }, []);

  const getUserData = () => {
    axios
      .get(`${BASE_URL}/getOprationalUsers?page=${page}&size=${page * 10}`)
      .then((res) => {
        setnoOfUsers(res.data.NoOfUsers - 1);
        const opretionData = res.data.users;
        setdata(opretionData);
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
            if (e.course.toLowerCase().includes(filterBySearch)) {
              return e;
            }
          } else {
            return e?.id.toString().includes(filterBySearch.toString());
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
            return e.oprationalStage === filter.stage;
          }
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (filter.priority !== "") {
          if (filter.priority == "all") {
            return e;
          } else if (filter.priority === "Urg") {
            return e.status === "noTeacher";
          } else if (filter.priority === "High") {
            return e.status === "noCourse";
          } else {
            return e.status === "noBatch";
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
        templateMsg={templateMsg}
        setpage={setpage}
        setfilter={setFilter}
        noOfUsers={noOfUsers}
        setdata={setdata}
      />
    </div>
  );
}

export default Support;
