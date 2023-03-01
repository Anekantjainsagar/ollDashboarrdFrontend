import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";

import NewLead from "../NewLead/index";
import UserHeading from "../UserHeading/index";
import UserBar from "../UserBar/index";
import FollowUp from "../../Components/FollowUp/index";
import Meetings from "../../Components/Meetings/index";
import B2BContext from "../../Context/B2BContext";
import { useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";

const RightSection = ({
  users,
  schools,
  getSchools,
  getUsers,
  page,
  setPage,
  noOfUsers,
  meetings,
  getMeetings,
  followUp,
  getFollowUps,
  getOffers,
  agents,
  offers,
  getPrograms,
  programs,
  filter,
  setFilter,
  filteredUsers,
  search,
  setSearch,
}) => {
  const b2b = useContext(B2BContext);
  const location = useLocation();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (b2b?.login?.type === "b2b") {
      if (b2b?.login?.name !== "Vidushi") {
        setUser(b2b?.login?.name);
      }
    }
  }, [location.pathname]);

  const [b2bUser, setB2bUser] = useState([]);
  const [date, setDate] = useState("2023-01-01");

  const downloadData = () => {
    axios.get(`${MONITOR_BACKEND}/getAllUsers`).then((res) => {
      const data = res.data.filter((e) => new Date(e.inqDate) > new Date(date));
      setB2bUser(data);
    });
  };

  useEffect(() => {
    downloadData();
  }, []);

  return (
    <div className={styles.mainPanel}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className={styles.mainHead}>Leads</h1>
        <div style={{ width: "30%" }}>
          <input
            type="date"
            style={{ width: "50%" }}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              downloadData();
            }}
          />
          <CSVLink
            data={b2bUser}
            filename="B2BUsers"
            className={styles.btns}
            onClick={() => {
              downloadData();
            }}
          >
            Export
          </CSVLink>
        </div>
        <input
          type="text"
          style={{ width: "30%" }}
          placeholder="Search by School name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <NewLead
        schools={schools}
        getSchools={getSchools}
        getUsers={getUsers}
        agents={agents}
        offers={offers}
      />
      <div className={styles.usersDisplay}>
        <UserHeading
          filter={filter}
          setFilter={setFilter}
          agents={agents}
          offers={offers}
        />
        <div className={styles.usersDisplayContainer}>
          {filteredUsers
            ?.filter((e) => {
              if (user?.length > 0) {
                return e.handler.toLowerCase().includes(user.toLowerCase());
              }
              return e;
            })
            .map((user, i) => {
              return (
                <UserBar
                  user={user}
                  key={i}
                  schools={schools}
                  getUsers={getUsers}
                  getMeetings={getMeetings}
                  getFollowUps={getFollowUps}
                  getOffers={getOffers}
                  getPrograms={getPrograms}
                  programs={programs}
                  followUp={followUp}
                />
              );
            })}
          {noOfUsers ? (
            noOfUsers <= page * 10 ? null : (
              <div
                className={styles.loadBtn}
                style={{ fontSize: "1.65rem", width: "42%" }}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Show more
              </div>
            )
          ) : null}
        </div>
      </div>
      <div className={styles.blocks}>
        <FollowUp
          getFollowUps={getFollowUps}
          followUp={followUp}
          schools={schools}
          getUsers={getUsers}
        />
        <Meetings meetings={meetings} getMeetings={getMeetings} />
      </div>
    </div>
  );
};

export default RightSection;
