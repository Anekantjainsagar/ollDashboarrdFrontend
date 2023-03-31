import React from "react";
import Sidebar from "../../../Components/Sidebar/index";
import "./style.module.css";
import EmployeeHeader from "../../../Components/Employee/EmployeeHeader/index";
import EmployeeNav from "../../../Components/Employee/EmployeeNav";
import EmployeeBar from "../../../Components/Employee/EmployeeBar";
import styles from "./style.module.css";

const Employee = () => {
  return (
    <div style={{ backgroundColor: "black", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "88vw" }}>
        <EmployeeHeader />
        <div>
          <EmployeeNav />
          <div className={styles.users}>
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
            <EmployeeBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
