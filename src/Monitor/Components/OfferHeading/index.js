import React from "react";
import styles from "./style.module.css";

const OfferHeading = ({ filter, setFilter }) => {
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
      <p className={styles.typeDrop}>Type</p>
      <p className={styles.duration}>Duration</p>
      <p className={styles.type}>Type</p>
      <p className={styles.resources}>Resources</p>
      <p className={styles.actions}>Actions</p>
    </div>
  );
};

export default OfferHeading;
