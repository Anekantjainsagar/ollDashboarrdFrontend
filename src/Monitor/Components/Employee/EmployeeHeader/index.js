import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import AddModal from "../Modal/index";
import B2BContext from "../../../Context/B2BContext";
import { CSVLink } from "react-csv";
import fileDownload from "js-file-download";
import Axios from "axios";
import axios from "axios";
const uri = "https://crm.oll.co/api/hr";

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
              Axios({
                url: `${uri}/download/format`,
                method: "GET",
                responseType: "blob",
              }).then((res) => {
                fileDownload(res.data, "format.csv");
              });
            }}
          >
            Format
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Add Employee
          </button>
          {file ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("file", file);
                axios
                  .post(`${uri}/uploadEmployees`, formData)
                  .then((res) => {
                    context.employee.getEmployees();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Import
            </button>
          ) : (
            <input
              type="file"
              onChange={(e) => {
                e.preventDefault();
                setFile(e.target.files[0]);
              }}
              style={{ width: "24%" }}
            />
          )}
          <CSVLink
            data={context?.employee?.allEmployees}
            filename="Employees"
            className={styles.btns}
          >
            Export
          </CSVLink>
        </div>
      </div>
    </>
  );
};

export default EmployeeHeader;
