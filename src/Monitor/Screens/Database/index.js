import React from "react";
import styles from "./style.module.css";

import DbHeader from "../../Components/DbHeader/index";
import DbUserHeading from "../../Components/DbUserHeading";
import DbUserBar from "../../Components/DbUserBar";
import Sidebar from "../../Components/Sidebar";

const Database = ({
  schools,
  dbFilters,
  setDbFilters,
  AllSchools,
  getSchools,
}) => {

  return (
    <>
      <div className={styles.home}>
        <Sidebar />
        <div style={{ width: "88vw" }}>
          <DbHeader getSchools={getSchools} schools={schools} />
          <DbUserHeading
            dbFilters={dbFilters}
            setDbFilters={setDbFilters}
            school={schools}
            AllSchools={AllSchools}
          />
          <div className={styles.dbDisplay}>
            {schools.map((school, i) => {
              return (
                <DbUserBar
                  school={school}
                  AllSchools={AllSchools}
                  key={i}
                  getSchools={getSchools}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Database;
