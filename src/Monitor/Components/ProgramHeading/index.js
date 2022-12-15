import React from "react";
import styles from "./style.module.css";

const ProgramHeading = () => {
  return (
    <div className={styles.bar}>
      <p className={styles.checkBox}>ID</p>
      <p className={styles.course}>Name</p>
      <p className={styles.typeDrop}>Status</p>
      <p className={styles.duration}>Learners</p>
      <p className={styles.type}>Progress</p>
      <p className={styles.type}>Educator</p>
      <p className={styles.resources}>Next</p>
      <p className={styles.actions}>Actions</p>
    </div>
  );
};

export default ProgramHeading;
