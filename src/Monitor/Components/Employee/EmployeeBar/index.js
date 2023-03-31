import React from "react";
import styles from "./style.module.css";

const EmployeeBar = () => {
  return (
    <div className={styles.bar}>
      <p>Emp - 1</p>
      <p>Anekant Jain</p>
      <p>Anekantjainsagar@gmail.com</p>
      <p>
        <select name="role">
          {["Employee", "Admin", "Manager"].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p>
        <select name="status">
          {["Active", "Inactive"].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p>Actions</p>
    </div>
  );
};

export default EmployeeBar;
