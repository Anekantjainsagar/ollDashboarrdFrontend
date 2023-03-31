import React, { useState } from "react";
import styles from "./style.module.css";

const EmployeeHeader = () => {
  const [file, setFile] = useState();
  return (
    <div className={styles.head}>
      <h1>Employee</h1>
      <input type="text" placeholder="Search here..." />
      <div className={styles.rsection}>
        <button>Add Employee</button>
        <input
          type="file"
          onChange={(e) => {
            e.preventDefault();
            setFile(e.target.files[0]);
          }}
          style={file ? { width: "28%" } : { width: "40%" }}
        />
        {file ? <button>Import</button> : null}
        <button>Export</button>
      </div>
    </div>
  );
};

export default EmployeeHeader;
