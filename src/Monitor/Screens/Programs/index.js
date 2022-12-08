import React, { useState } from "react";
import styles from "./style.module.css";

import ProgramHeading from "../../Components/ProgramHeading";
import ProgramBar from "../../Components/ProgramBar";
import Sidebar from "../../Components/Sidebar";

const Programs = ({ programs }) => {
  const [filter, setFilter] = useState();

  return (
    <>
      <div className={styles.home}>
        <Sidebar />
        <div style={{ width: "86vw" }}>
          <p
            style={{ fontSize: "2.25rem", fontWeight: "bold", margin: "2rem" }}
          >
            Programs
          </p>
          <ProgramHeading filter={filter} setFilter={setFilter} />
          <div className={styles.dbDisplay}>
            {programs
              .filter((e) => {
                if (filter?.length > 0) {
                  return e.name.toLowerCase().includes(filter.toLowerCase());
                }
                return e;
              })
              .map((program, index) => {
                return <ProgramBar program={program} key={index} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
