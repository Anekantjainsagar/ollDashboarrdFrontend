import React, { useEffect, useState } from "react";
import "../../css/Navbar.css";
import "../../css/Topbar.css";
import "../../css/usersData.css";
import "../../css/floatingData.css";

import Nav from "../Nav";
import Topbar from "../Topbar/Topbar";
import axios from "axios";
import { BASE_URL } from "../../Utils/index";
import UsersData from "../UsersData/UsersData";

function Sales({ sales }) {
  const [data, setdata] = useState();
  let [filterBySearch, setfilterBySearch] = useState();
  const [filter, setFilter] = useState({ stage: "", status: "", class: "" });
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
  }, [page, data]);

  useEffect(() => {
    var searchFilter = data
      ?.filter((e) => {
        if (filterBySearch !== undefined && filterBySearch !== "") {
          if (isNaN(filterBySearch) === true) {
            if (e.name.toLowerCase().includes(filterBySearch)) {
              return e;
            }
          } else {
            filterBySearch = filterBySearch;
            if (filterBySearch.toString().length > e?.id.toString().length) {
              if (
                e?.phone.toString().includes(filterBySearch) ||
                (e?.cCode?.toString() + e?.phone?.toString()).includes(
                  filterBySearch
                )
              ) {
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
      <Nav sales={sales} data={data} />
      <Topbar
        getUserData={getUserData}
        filterBySearch={filterBySearch}
        setfilterBySearch={setfilterBySearch}
        sales={sales}
      />
      <UsersData
        sales={sales}
        getUserData={getUserData}
        usersData={filteredData}
        filterBySearch={filterBySearch}
        filter={filter}
        page={page}
        setpage={setpage}
        setfilter={setFilter}
        noOfUsers={noOfUsers}
        setdata={setdata}
        templateMsg={templateMsg}
      />
    </div>
  );
}

export default Sales;
