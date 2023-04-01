import React from "react";
import styles from "./style.module.css";

const Nav = () => {
  return (
    <div className={styles.bar}>
      <p>ID</p>
      <p>Date</p>
      <p>Ocassion</p>
      <p>Day</p>
      <p>Action</p>
    </div>
  );
};

export default Nav;
