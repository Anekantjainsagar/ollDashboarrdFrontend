import React, { useState } from "react";
import styles from "./style.module.css";

import NewLead from "../NewLead/index";
import UserHeading from "../UserHeading/index";
import UserBar from "../UserBar/index";
import FollowUp from "../../Components/FollowUp/index";
import Meetings from "../../Components/Meetings/index";

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
}) => {
  const [search, setSearch] = useState("");
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
        <input
          type="text"
          style={{ width: "30%" }}
          placeholder="Search here..."
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
            .filter((e) => {
              if (search?.length > 0) {
                return e.schoolName
                  .toLowerCase()
                  .includes(search.toLowerCase());
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
