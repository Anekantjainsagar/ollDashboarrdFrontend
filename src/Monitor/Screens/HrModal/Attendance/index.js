import React, { useContext } from "react";
import Header from "../../../Components/Attendance/Header";
import Nav from "../../../Components/Attendance/Nav";
import Bar from "../../../Components/Attendance/Bar";
import Sidebar from "../../../Components/Sidebar";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

const Attendance = () => {
  const context = useContext(B2BContext);
  return (
    <div style={{ backgroundColor: "black", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "88vw" }}>
        <Header />
        <div>
          <Nav />
          <div className={styles.users}>
            {context?.employee?.employees.map((e) => {
              return <Bar data={e} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
