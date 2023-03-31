import React from "react";
import styles from "./style.module.css";

const EmployeeNav = () => {
  return (
    <div className={styles.bar}>
      <p>Employee ID</p>
      <p>Name</p>
      <p>Email</p>
      <p>User Role</p>
      <p>Status</p>
      <p>Actions</p>
    </div>
  );
};

export default EmployeeNav;
