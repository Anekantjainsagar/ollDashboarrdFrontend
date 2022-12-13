import React from "react";
import Heading from "../Components/Heading";
import User from "../Components/User";
import styles from "../style.module.css";

const Applicants = ({ applicants }) => {
  return (
    <div className={styles.mainBox}>
      <h1>Applicants : </h1>
      <Heading />
      <div className={styles.usersDisplay}>
        {applicants?.map((app) => {
          return <User data={app} />;
        })}
      </div>
    </div>
  );
};

export default Applicants;
