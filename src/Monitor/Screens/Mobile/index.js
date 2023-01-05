import React from "react";
import styles from "./style.module.css";
import AddLead from "./Components/AddLead";

const Mobile = () => {
  return (
    <div className={styles.mobile}>
      <h1>New Lead</h1>
      <AddLead />
    </div>
  );
};

export default Mobile;
