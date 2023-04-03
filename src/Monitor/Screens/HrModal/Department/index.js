import React from "react";
import Header from "../../../Components/Department/Header";
import Nav from "../../../Components/Department/Nav";
import Bar from "../../../Components/Department/Bar";
import Sidebar from "../../../Components/Sidebar";
import styles from "./style.module.css";

const Department = () => {
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

export default Department;
