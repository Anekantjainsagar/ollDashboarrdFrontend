import React from "react";
import Heading from "../Components/Heading";
import User from "../Components/User";
import styles from "../style.module.css";

const Shortlisted = ({ applicants, id, getApplicants }) => {
  return (
    <div className={styles.mainBox}>
      <h1>Shortlisted : </h1>
      <Heading />
      <div className={styles.usersDisplay}>
        {applicants
          ?.filter((e) => e.courseId === id)
          .filter((e) => e.status === "Shortlisted")
          .map((app) => {
            return <User data={app} getApplicants={getApplicants} />;
          })}
      </div>
    </div>
  );
};

export default Shortlisted;
