import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import AddModal from "../Modal/index";
import B2BContext from "../../../Context/B2BContext";

const EmployeeHeader = () => {
  const [file, setFile] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const context = useContext(B2BContext);
  return (
    <>
      <AddModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className={styles.head}>
        <h1>Employee</h1>
        <input
          type="search"
          placeholder="Search here..."
          value={context.employee.empSearch}
          onChange={(e) => {
            context.employee.setEmpSearch(e.target.value);
          }}
        />
        <div className={styles.rsection}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Add Employee
          </button>
          <input
            type="file"
            onChange={(e) => {
              e.preventDefault();
              setFile(e.target.files[0]);
            }}
            style={file ? { width: "28%" } : { width: "40%" }}
          />
          {file ? <button>Import</button> : null}
          <button>Export</button>
        </div>
      </div>
    </>
  );
};

export default EmployeeHeader;
