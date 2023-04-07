import React, { useContext, useState } from "react";
import Header from "../../../Components/Department/Header";
import Nav from "../../../Components/Department/Nav";
import Bar from "../../../Components/Department/Bar";
import Sidebar from "../../../Components/Sidebar";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

const Department = () => {
  const [search, setSearch] = useState("");
  const context = useContext(B2BContext);
  return (
    <div style={{ backgroundColor: "black", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "88vw" }}>
        <Header search={search} setSearch={setSearch} />
        <div>
          <Nav />
          <div className={styles.users}>
            {context?.department?.departments
              .filter((e) => {
                if (search) {
                  return e.name.toLowerCase().includes(search.toLowerCase());
                }
                return e;
              })
              .map((e, i) => {
                return <Bar data={e} i={i} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
