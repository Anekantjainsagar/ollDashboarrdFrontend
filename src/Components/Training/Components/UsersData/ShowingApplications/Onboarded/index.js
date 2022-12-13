import React from "react";
import styles from "../style.module.css";

const Onboarded = ({ applicants, id }) => {
  return (
    <div className={styles.mainBox}>
      <h1>Onboarded : </h1>
      <div className={styles.OnboardedHeading}>
        <p>Name</p>
        <p>Phone</p>
        <p>Email</p>
        <p>Location</p>
        <p>Level</p>
        <p>Payment</p>
        <p>Contract</p>
      </div>
      <div className={styles.usersDisplay}>
        {applicants
          ?.filter((e) => e.courseId === id)
          .filter((e) => e.status === "Onboarded")
          .map((app) => {
            return (
              <div className={styles.OnboardedUser}>
                <p>{app?.name}</p>
                <p>{app?.phone}</p>
                <p>{app?.email}</p>
                <p>{app?.location}</p>
                <p>{app?.payment.level}</p>
                <p>Rs. {app?.payment.amount}</p>
                <p>{app?.contract}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Onboarded;
