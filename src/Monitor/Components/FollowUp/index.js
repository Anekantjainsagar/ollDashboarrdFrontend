import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Bar from "./Bar/index";
import { CSVLink } from "react-csv";

const FollowUp = ({ followUp, getFollowUps, schools, getUsers }) => {
  const [showingFollowUp, setShowingFollowUp] = useState("Today");
  const [tommorow, setTommorow] = useState();

  useEffect(() => {
    let tommorow;
    var today = new Date();
    tommorow = new Date(today);
    tommorow.setDate(today.getDate() + 1);
    setTommorow(tommorow);
  }, [followUp]);

  return (
    <>
      <div className={styles.follow}>
        <div className={styles.header}>
          <h1>Follow Up</h1>
          <select
            onChange={(e) => setShowingFollowUp(e.target.value)}
            value={showingFollowUp}
          >
            <option value="Today">Today</option>
            <option value="Tommorow">Tommorow</option>
            <option value="Upcoming">Upcoming</option>
          </select>
          {followUp?.length > 0 ? (
            <CSVLink
              data={followUp?.map(({ _id, schoolId, userId, done, __v, ...rest }) => ({ ...rest })).filter((follow) => {
                if (showingFollowUp === "Today") {
                  return (
                    new Date(Date.now()).toString().slice(4, 16) ===
                    new Date(follow.startDate).toString().slice(4, 16)
                  );
                } else if (showingFollowUp === "Tommorow") {
                  return (
                    tommorow.toString().slice(4, 16) ===
                    new Date(follow.startDate).toString().slice(4, 16)
                  );
                } else {
                  return new Date(follow.startDate) > new Date(Date.now());
                }
              })}
              filename="FollowUps"
              className={styles.btn}
            >
              Export
            </CSVLink>
          ) : null}
        </div>
        <div className={styles.data}>
          {followUp
            ?.filter((follow) => {
              if (showingFollowUp === "Today") {
                return (
                  new Date(Date.now()).toString().slice(4, 16) ===
                  new Date(follow.startDate).toString().slice(4, 16)
                );
              } else if (showingFollowUp === "Tommorow") {
                return (
                  tommorow.toString().slice(4, 16) ===
                  new Date(follow.startDate).toString().slice(4, 16)
                );
              } else {
                return new Date(follow.startDate) > new Date(Date.now());
              }
            })
            .map((follow, i) => {
              return (
                <Bar
                  key={i}
                  follow={follow}
                  schools={schools}
                  getFollowUps={getFollowUps}
                  getUsers={getUsers}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FollowUp;
