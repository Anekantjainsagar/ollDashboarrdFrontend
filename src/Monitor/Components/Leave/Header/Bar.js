import React from "react";
import styles from "./style.module.css";

const Bar = () => {
  return (
    <div className={styles.barH}>
      <p>Emp - 1</p>
      <p>Anekant Jain</p>
      <p>{new Date().toString().slice(0, 21)}</p>
      <p>
        <select name="role">
          {["Approved", "Rejected"].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p>
        <select name="status">
          {["Yes", "No"].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p>Actions</p>
    </div>
  );
};

export default Bar;
