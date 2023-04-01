import React from "react";
import Header from "../../../Components/Leave/Header/Header";
import Nav from "../../../Components/Leave/Header/Nav";
import Bar from "../../../Components/Leave/Header/Bar";
import Sidebar from "../../../Components/Sidebar";
import styles from "./style.module.css";

const Leaves = () => {
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

export default Leaves;
