import React from "react";
import Heading from "../Components/Heading";
import User from "../Components/User";
import styles from "../style.module.css";

const Shortlisted = ({ applicants,id }) => {
  return (
    <div className={styles.mainBox}>
      <h1>Shortlisted : </h1>
      <Heading />
      <div className={styles.usersDisplay}>
        {applicants
          ?.filter((e) => e.courseId === id)
          .map((app) => {
            return <User data={app} />;
          })}
      </div>
    </div>
  );
};

export default Shortlisted;
