import axios from "axios";
import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { CSVLink } from "react-csv";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import B2BContext from "../Monitor/Context/B2BContext";
import { BASE_URL } from "../Utils/index";
import fileDownload from "js-file-download";
import MONITOR_BACKEND from "../Monitor/Utils";

const Nav = ({ sales }) => {
  const [time, settime] = useState(new Date().toLocaleTimeString());
  const [logoutBtn, setlogoutBtn] = useState(false);
  const history = useNavigate();
  const b2b = useContext(B2BContext);
  const [file, setFile] = useState();
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    updateSchools();
    setInterval(() => {
      settime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  const updateSchools = () => {
    axios.get(`${BASE_URL}/getAllUsers`).then((response) => {
      const exports = response?.data;
      setExportData(exports);
    });
  };

  return (
    <>
      <div className="nav">
        <h1>Dashboard</h1>
        <div className="time">
          <MdOutlineAccessTimeFilled size={25} color={"grey"} /> {time}
        </div>
        <div style={{ width: "45%", display: "flex", alignItems: "center" }}>
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
                    .post(`${BASE_URL}addExcelUsers`, formData)
                    .then((res) => {
                      if (res?.data[0]?._id) {
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
              console.log("Clicked");
              Axios({
                url: `${MONITOR_BACKEND}/download/b2cFormat`,
                method: "GET",
                // responseType: "blob",
              }).then((res) => {
                console.log(res);
                fileDownload(res.data, "format.csv");
              });
            }}
          >
            Format
          </button>
        </div>
        <div className="profileSection">
          {exportData?.length > 0 ? (
            <CSVLink
              data={exportData}
              filename="Schools"
              className="btn"
              onClick={() => {
                updateSchools();
              }}
            >
              Export
            </CSVLink>
          ) : null}
          <p>{b2b?.login?.name}</p>
          <img
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=463"
            alt="Profile"
            onClick={() => {
              setlogoutBtn(!logoutBtn);
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          display: logoutBtn ? "block" : "none",
          right: "6%",
          top: "10%",
          backgroundColor: "black",
          border: "1px solid white",
          color: "white",
          borderRadius: "1rem",
          cursor: "pointer",
          fontSize: "1.6rem",
          padding: "0.5rem 2rem",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          b2b.setLogin({});
          history("/");
        }}
      >
        Logout
      </div>
    </>
  );
};

export default Nav;
