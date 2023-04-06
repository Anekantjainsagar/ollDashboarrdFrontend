import React, { useContext, useState } from "react";
import Header from "../../../Components/Appreciation/Header";
import Nav from "../../../Components/Appreciation/Nav";
import Bar from "../../../Components/Appreciation/Bar";
import Sidebar from "../../../Components/Sidebar";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

const Appreciation = () => {
  const context = useContext(B2BContext);
  const [search, setSearch] = useState("");
  return (
    <div style={{ backgroundColor: "black", display: "flex" }}>
      <Sidebar />
      <div style={{ width: "88vw" }}>
        <Header search={search} setSearch={setSearch} />
        <div>
          <Nav />
          <div className={styles.users}>
            {context?.appreciation?.appreciations
              ?.filter((e) => {
                if (search) {
                  return e?.employeeName
                    ?.toLowerCase()
                    .includes(search?.toLowerCase());
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

export default Appreciation;
