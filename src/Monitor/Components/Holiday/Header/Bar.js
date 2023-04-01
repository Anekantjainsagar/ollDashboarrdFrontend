import React from "react";
import styles from "./style.module.css";

const Bar = () => {
  return (
    <div className={styles.barH}>
      <p>1</p>
      <p>{new Date().toString().slice(0, 21)}</p>
      <p>I am a new ocassion</p>
      <p>Monday</p>
      <p>Actions</p>
    </div>
  );
};

export default Bar;
