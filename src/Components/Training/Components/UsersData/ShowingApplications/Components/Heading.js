import React from "react";
import styles from "../style.module.css";

const Heading = () => {
  return (
    <div className={styles.heading}>
      <p>Name</p>
      <p>Phone</p>
      <p>Email</p>
      <p>Location</p>
      <p>Resume</p>
      <p>Meeting</p>
      <p>Interview</p>
      <p>Actions</p>
    </div>
  );
};

export default Heading;
