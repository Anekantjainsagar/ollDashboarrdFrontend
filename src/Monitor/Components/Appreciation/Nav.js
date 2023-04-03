import React from "react";
import styles from "./style.module.css";

const Nav = () => {
  return (
    <div className={styles.bar}>
      <p>ID</p>
      <p>Given To</p>
      <p>Award Name</p>
      <p>Given On</p>
      <p>Actions</p>
    </div>
  );
};

export default Nav;
