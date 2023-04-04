import React from "react";
import styles from "./style.module.css";

const Nav = () => {
  return (
    <div className={styles.bar}>
      <p>ID</p>
      <p>Name</p>
      <p>Parent Designation</p>
      <p>Actions</p>
    </div>
  );
};

export default Nav;
