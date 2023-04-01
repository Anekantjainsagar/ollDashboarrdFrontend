import React from "react";
import styles from "./style.module.css";

const Nav = () => {
  return (
    <div className={styles.bar}>
      <p>Employee ID</p>
      <p>Employee Name</p>
      <p>Leave Date</p>
      <p>Leave Status</p>
      <p>Paid</p>
      <p>Actions</p>
    </div>
  );
};

export default Nav;
