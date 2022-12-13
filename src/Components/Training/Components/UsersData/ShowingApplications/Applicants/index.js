import React from "react";
import Heading from "../Components/Heading";
import User from "../Components/User";
import styles from "../style.module.css";

const Applicants = ({ applicants, id, getApplicants }) => {
  return (
    <div className={styles.mainBox}>
      <div style={{ marginTop: "1rem" }}></div>
      <h1>Applicants : </h1>
      <Heading />
      <div className={styles.usersDisplay}>
        {applicants
          ?.filter((e) => e.courseId === id)
          .filter((e) => e.status === "Applicants")
          .map((app) => {
            return <User data={app} getApplicants={getApplicants} />;
          })}
      </div>
    </div>
  );
};

export default Applicants;
