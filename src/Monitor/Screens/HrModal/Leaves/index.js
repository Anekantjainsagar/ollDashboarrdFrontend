import React, { useContext } from "react";
import Header from "../../../Components/Leave/Header/Header";
import Nav from "../../../Components/Leave/Header/Nav";
import Bar from "../../../Components/Leave/Header/Bar";
import Sidebar from "../../../Components/Sidebar";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

const Leaves = () => {
  const context = useContext(B2BContext);
  return (
    <div style={{ backgroundColor: "black", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "88vw" }}>
        <Header />
        <div>
          <Nav />
          <div className={styles.users}>
            {context?.leave?.leaves?.map((e) => {
              return <Bar data={e} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
