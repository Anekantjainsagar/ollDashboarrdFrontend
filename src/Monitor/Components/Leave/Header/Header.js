import React from "react";
import styles from "./style.module.css";

const Header = () => {
  return (
    <div className={styles.head}>
      <h1>Leaves</h1>
      <input type="search" placeholder="Search here..." />
      <div className={styles.rsection}>
        <button>Add Leave</button>
        <button>Export</button>
      </div>
    </div>
  );
};

export default Header;
