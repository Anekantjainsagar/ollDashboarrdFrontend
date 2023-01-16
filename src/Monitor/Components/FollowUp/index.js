import React from "react";
import styles from "./style.module.css";
import Bar from "./Bar/index";

const FollowUp = ({ followUp, getFollowUps, schools, getUsers }) => {
  return (
    <>
      <div className={styles.follow}>
        <div className={styles.header}>
          <h1>Follow Up</h1>
        </div>
        <div className={styles.data}>
          {followUp
            ?.filter((follow) => {
              if (
                new Date(Date.now()).toString().slice(4, 16) ===
                new Date(follow.startDate).toString().slice(4, 16)
              ) {
                return follow;
              }
            })
            .sort(
              (a, b) =>
                parseInt(a.time.split(":")[0]) - parseInt(b.time.split(":")[0])
            )
            .map((follow) => {
              return (
                <Bar
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
