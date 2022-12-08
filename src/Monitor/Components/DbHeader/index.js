import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import array from "../../Screens/Database/array";
import SchoolModal from "../SchoolModal/index";
import { CSVLink, CSVDownload } from "react-csv";

const DbHeader = ({ getSchools, schools }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [schoolsToExport, setSchoolsToExport] = useState([]);
  function openModal() {
    setIsOpen(true);
  }

  const updateSchools = () => {
    const exports = schools.filter((school) => {
      if (array.includes("all")) {
        return school;
      } else {
        for (let index = 0; index < array.length; index++) {
          if (school._id === array[index]) {
            return school;
          }
        }
      }
      school["Principal Name"] = school.principal?.name;
      school["Principal Email"] = school.principal?.email;
      school["Principal Phone"] = school.principal?.phone;
      school["Principal Role"] = school.principal?.role;
      school["Coordinator Name"] = school.coordinator?.name;
      school["Coordinator Email"] = school.coordinator?.email;
      school["Coordinator Phone"] = school.coordinator?.phone;
      school["Coordinator Role"] = school.coordinator?.role;
      school["Trustee Name"] = school.trustee?.name;
      school["Trustee Email"] = school.trustee?.email;
      school["Trustee Phone"] = school.trustee?.phone;
      school["Trustee Role"] = school.trustee?.role;
      delete school["principal"];
      delete school["coordinator"];
      delete school["trustee"];
      delete school["logo"];
    });
    setSchoolsToExport(exports);
  };
  useEffect(() => {
    updateSchools();
  }, [schools]);

  return (
    <>
      <SchoolModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        getSchools={getSchools}
      />
      <div className={styles.head}>
        <h1>Database</h1>
        <div className={styles.rSection}>
          <CSVLink
            data={schoolsToExport}
            filename="Schools"
            className={styles.btns}
            onClick={() => {
              updateSchools();
            }}
          >
            Export
          </CSVLink>
          <button onClick={() => setIsOpen(true)}>Add New</button>
        </div>
      </div>
    </>
  );
};

export default DbHeader;
