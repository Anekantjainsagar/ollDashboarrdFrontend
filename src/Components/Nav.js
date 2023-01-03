import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Nav = ({ sales, data }) => {
  const [time, settime] = useState(new Date().toLocaleTimeString());
  const [logoutBtn, setlogoutBtn] = useState(false);
  const history = useNavigate();

  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    setInterval(() => {
      settime(new Date().toLocaleTimeString());
    }, 1000);
    updateSchools();
  }, []);

  const updateSchools = () => {
    const exports = data?.filter((element) => {
      element["Address"] = element?.batchDetails?.address;
      element["Mode"] = element?.batchDetails?.mode;
      element["Start Date"] = new Date(element?.batchDetails?.startDate);
      element["Type"] = element?.batchDetails?.type;
      element["Price"] = element?.batchDetails?.price;
      element["Sessions Count"] = element?.batchDetails?.sessionsCount;
      element["Total Price"] =
        parseInt(element?.batchDetails?.sessionsCount) *
        parseInt(element?.batchDetails?.price);
      delete element["batchDetails"];
      delete element["__v"];
    });
    setExportData(exports);
  };

  console.log(data);

  return (
    <>
      <div className="nav">
        <h1>Dashboard</h1>
        <div className="time">
          <MdOutlineAccessTimeFilled size={25} color={"grey"} /> {time}
        </div>
        <div className="profileSection">
          {data?.length > 0 ? (
            <CSVLink
              data={exportData?.length > 0 ? exportData : data}
              filename="Schools"
              className="btn"
              onClick={() => {
                updateSchools();
              }}
            >
              Export
            </CSVLink>
          ) : null}
          <p>{sales?.name}</p>
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
          localStorage.clear();
          history("/");
        }}
      >
        Logout
      </div>
    </>
  );
};

export default Nav;
