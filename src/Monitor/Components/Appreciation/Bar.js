import React from "react";
import styles from "./style.module.css";

const Bar = () => {
  return (
    <div className={styles.barH}>
      <p>1</p>
      <p>Anekant Jain</p>
      <p>Most Improved Employee</p>
      <p>{new Date().toString().slice(0, 21)}</p>
      <p>Actions</p>
    </div>
  );
};

export default Bar;
