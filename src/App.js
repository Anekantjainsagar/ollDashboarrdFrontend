import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sales from "./Components/Sales/index";
import Login from "./Components/Login/Login";
import Support from "./Components/Support/index";
import Training from "./Components/Training/index";
import axios from "axios";
import { BASE_URL } from "./Utils";
import Home from "./Monitor/Screens/Home/index";
import Database from "./Monitor/Screens/Database";
import Offers from "./Monitor/Screens/Offers";
import Agents from "./Monitor/Screens/Agents";
import Programs from "./Monitor/Screens/Programs";
import MONITOR_BACKEND from "./Monitor/Utils";
import OnboardingForm from "./Components/Training/Components/UsersData/OnboardingForm";
import ProgramReport from "./Monitor/Screens/ProgramReport";
import ProgramReportDetails from "./Monitor/Screens/ProgramReportDetails";
import Mobile from "./Monitor/Screens/Mobile/index";

const App = () => {
  const history = useNavigate();
  const location = useLocation();
  const [sales, setsales] = useState([]);
  const [checkUser, setcheck] = useState([]);

  const check = async () => {
    await axios
      .post(`${BASE_URL}/salesCheck`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        const obj = res.data.message;
        if (Object.keys(obj)[0] === "_id") {
          setcheck(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const token = localStorage?.getItem("token");

  const checkLogin = async () => {
    if (!window?.location?.href.includes("training/teacherOnboarding")) {
      if (token?.length > 0) {
        await check();
        if (Object.keys(checkUser)[0] === "_id") {
          history(`/${checkUser?.type}`);
        }
      } else {
        history("/");
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, [token]);

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
  const [reports, setReports] = useState([]);
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

  const getReports = () => {
    axios
      .get(`${MONITOR_BACKEND}/getReports`)
      .then((response) => {
        setReports(response.data.reports);
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
    getReports();
    getPrograms();
  }, [page, location.pathname]);

  const { innerWidth } = window;

  return (
    <Routes>
      <Route path="/" element={<Login setsales={setsales} />} />
      <Route path="/sales" element={<Sales sales={checkUser} />} />
      <Route path="/Operations" element={<Support sales={checkUser} />} />
      <Route path="/training" element={<Training sales={checkUser} />} />
      <Route
        path="/training/teacherOnboarding/:id"
        element={<OnboardingForm />}
      />
      <Route path="/b2b" element={innerWidth < 550 ? <Mobile /> : <Home />} />
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
      <Route
        path="/programs/report/:id"
        element={
          <ProgramReport
            programs={programs}
            reports={reports}
            getReports={getReports}
          />
        }
      />
      <Route
        path="/programs/reportDetails/:id"
        element={
          <ProgramReportDetails
            programs={programs}
            reports={reports}
            getReports={getReports}
          />
        }
      />
      <Route path="*" render={() => <Navigate to="/" />} />
      <Route path="/undefined" element={<Login setsales={setsales} />} />
    </Routes>
  );
};

export default App;
