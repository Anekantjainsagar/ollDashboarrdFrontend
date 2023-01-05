import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Sidebar from "../../Components/Sidebar/index";
import RightSection from "../../Components/RightSection/index";
import Database from "../Database/index";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import Offers from "../Offers";
import Agents from "../Agents";
import Programs from "../Programs";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNoOfUsers, setTotalNoOfUsers] = useState();
  const [meetings, setMeetings] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const [offers, setOffers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState({
    status: "all",
    handler: "all",
    stage: "all",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dbFilters, setDbFilters] = useState({
    name: "",
    type: "",
    board: "",
    location: "",
    principal: "",
    trustee: "",
    coordinator: "",
  });

  const getSchools = () => {
    axios
      .get(`${MONITOR_BACKEND}/getSchools`)
      .then((response) => {
        setSchools(response.data.schools);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMeetings = () => {
    axios
      .get(`${MONITOR_BACKEND}/getMeeting`)
      .then((response) => {
        setMeetings(response.data.meetings.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFollowUps = () => {
    axios
      .get(`${MONITOR_BACKEND}/getFollowUP`)
      .then((response) => {
        setFollowUp(response.data.follows?.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsers = () => {
    axios
      .get(`${MONITOR_BACKEND}/getUsers?page=${page}&size=${page * 10}`)
      .then((response) => {
        setUsers(response.data.users);
        setTotalNoOfUsers(response.data.noOfUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOffers = () => {
    axios
      .get(`${MONITOR_BACKEND}/getOffers`)
      .then((response) => {
        setOffers(response.data.offers?.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAgents = () => {
    axios
      .get(`${MONITOR_BACKEND}/getAgents`)
      .then((response) => {
        setAgents(response.data.agents?.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPrograms = () => {
    axios
      .get(`${MONITOR_BACKEND}/getPrograms`)
      .then((response) => {
        setPrograms(response.data.programs?.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var searchFilter = schools
      ?.filter((e) => {
        if (dbFilters.name !== undefined && dbFilters.name !== "") {
          return e.name.toLowerCase().includes(dbFilters.name);
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (dbFilters.location !== undefined && dbFilters.location !== "") {
          return e.city.toLowerCase().includes(dbFilters.location);
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (dbFilters.principal !== undefined && dbFilters.principal !== "") {
          return e.principal?.name.toLowerCase().includes(dbFilters.principal);
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (dbFilters.trustee !== undefined && dbFilters.trustee !== "") {
          return e.trustee?.name.toLowerCase().includes(dbFilters.trustee);
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (
          dbFilters.coordinator !== undefined &&
          dbFilters.coordinator !== ""
        ) {
          return e.coordinator?.name
            .toLowerCase()
            .includes(dbFilters.coordinator);
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (dbFilters.type !== undefined && dbFilters.type !== "") {
          if (dbFilters.type === "All") {
            return e;
          } else {
            return e.type.toLowerCase().includes(dbFilters.type.toLowerCase());
          }
        } else {
          return e;
        }
      })
      .filter((e) => {
        if (dbFilters.board !== undefined && dbFilters.board !== "") {
          if (dbFilters.board === "All") {
            return e;
          } else {
            return e.board
              .toLowerCase()
              .includes(dbFilters.board.toLowerCase());
          }
        } else {
          return e;
        }
      });
    setFilteredSchools(searchFilter);
  }, [dbFilters, schools]);

  useEffect(() => {
    var searchFilter = users
      ?.filter((e) => {
        if (filter.handler === "all") {
          return e;
        } else {
          return e.handler.toLowerCase().includes(filter.handler.toLowerCase());
        }
      })
      .filter((e) => {
        if (filter.status === "all") {
          return e;
        } else {
          return e.status.toLowerCase().includes(filter.status.toLowerCase());
        }
      })
      .filter((e) => {
        if (filter.stage === "all") {
          return e;
        } else {
          return e.stage?.toLowerCase().includes(filter.stage?.toLowerCase());
        }
      });
    setFilteredUsers(searchFilter);
  }, [filter, users]);

  useEffect(() => {
    getUsers();
    getSchools();
    getMeetings();
    getFollowUps();
    getOffers();
    getAgents();
    getPrograms();
  }, [page]);

  return (
    <div className={styles.home}>
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <RightSection
              users={users}
              filteredUsers={filteredUsers}
              schools={schools}
              followUp={followUp}
              page={page}
              noOfUsers={totalNoOfUsers}
              getSchools={getSchools}
              getUsers={getUsers}
              setPage={setPage}
              meetings={meetings}
              getMeetings={getMeetings}
              getOffers={getOffers}
              getFollowUps={getFollowUps}
              agents={agents}
              offers={offers}
              getPrograms={getPrograms}
              programs={programs}
              filter={filter}
              setFilter={setFilter}
            />
          }
        />
        <Route
          path="/db"
          element={
            <Database
              schools={filteredSchools}
              dbFilters={dbFilters}
              AllSchools={schools}
              setDbFilters={setDbFilters}
              getSchools={getSchools}
            />
          }
        />
        <Route
          path="/offers"
          element={<Offers offers={offers} getOffers={getOffers} />}
        />
        <Route
          path="/agents"
          element={<Agents getAgents={getAgents} agents={agents} />}
        />
        <Route path="/programs" element={<Programs programs={programs} />} />
      </Routes>
    </div>
  );
};

export default Home;
