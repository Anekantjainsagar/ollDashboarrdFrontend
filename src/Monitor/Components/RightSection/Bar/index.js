import React from "react";
import { FiLink } from "react-icons/fi";
import styles from "../style.module.css";

const Bar = ({ meet }) => {
  return (
    <div>
      <div className={styles.barItems}>
        <p>No of leads :- 0</p>
        <p>No of followups :- 0</p>
        <p>No of meetings :- 0</p>
      </div>
    </div>
  );
};

export default Bar;
