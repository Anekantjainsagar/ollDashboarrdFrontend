import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import array from "../../Screens/Database/array";
import SchoolModal from "../SchoolModal/index";
import { CSVLink } from "react-csv";
import axios, { Axios } from "axios";
import MONITOR_BACKEND from "../../Utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";

const DbHeader = ({ getSchools, schools }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();
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
          <form
            encType="multipart/form-data"
            method="post"
            style={{ width: "45%" }}
          >
            <input
              type="file"
              style={{ width: "100%" }}
              name="uploadfile"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            {file ? (
              <button
                style={{ width: "40%" }}
                onClick={(e) => {
                  e.preventDefault();
                  const formData = new FormData();
                  formData.append("uploadfile", file);
                  axios
                    .post(`${MONITOR_BACKEND}/uploadSchool`, formData)
                    .then((res) => {
                      if (res?.data[0]?._id) {
                        getSchools();
                        const notify = () =>
                          toast("School Saved Successfully", {
                            type: "success",
                          });
                        notify();
                        setFile("");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Import
              </button>
            ) : null}
          </form>
          <button
            style={{ width: "23%" }}
            onClick={(e) => {
              e.preventDefault();
              Axios({
                url: `${MONITOR_BACKEND}/download/predefinedFormat`,
                method: "GET",
                responseType: "blob",
              }).then((res) => {
                console.log(res);
                fileDownload(res.data, "format.csv");
              });
            }}
          >
            Predefined Fomat
          </button>
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
