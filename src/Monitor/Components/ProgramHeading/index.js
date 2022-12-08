import React from "react";
import styles from "./style.module.css";

const ProgramHeading = ({ filter, setFilter }) => {
  return (
    <div className={styles.bar}>
      <p className={styles.checkBox}>
        <input type="checkbox" />
        <p style={{ fontSize: "1.15rem" }}>All</p>
      </p>
      <input
        className={styles.course}
        placeholder="Course"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <p className={styles.typeDrop}>Model</p>
      <p className={styles.duration}>Mode</p>
      <p className={styles.type}>Payment</p>
      <p className={styles.type}>Training</p>
      <p className={styles.resources}>Terms</p>
      <p className={styles.actions}>Actions</p>
    </div>
  );
};

export default ProgramHeading;
