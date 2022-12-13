import React from "react";
import Heading from "../Components/Heading";
import User from "../Components/User";
import styles from "../style.module.css";

const Applicants = ({ applicants, id }) => {
  return (
    <div className={styles.mainBox}>
      <div style={{ marginTop: "1rem" }}></div>
      <h1>Applicants : </h1>
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

export default Applicants;
