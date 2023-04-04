import React from "react";
import Header from "../../../Components/Attendance/Header";
import Nav from "../../../Components/Attendance/Nav";
import Bar from "../../../Components/Attendance/Bar";
import Sidebar from "../../../Components/Sidebar";
import styles from "./style.module.css";

const Attendance = () => {
  return (
    <div style={{ backgroundColor: "black", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "88vw" }}>
        <Header />
        <div>
          <Nav />
          <div className={styles.users}>
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
            <Bar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
