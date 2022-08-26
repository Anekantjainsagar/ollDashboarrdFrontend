import React, { useState, useEffect } from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [time, settime] = useState(new Date().toLocaleTimeString());
  const [logoutBtn, setlogoutBtn] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setInterval(() => {
      settime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <>
      <div className="nav">
        <h1>Dashboard</h1>
        <div className="time">
          <MdOutlineAccessTimeFilled size={25} color={"grey"} /> {time}
        </div>
        <div className="profileSection">
          <select name="" id="">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <p>Samantha</p>
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
          sessionStorage.clear();
          history("/");
        }}
      >
        Logout
      </div>
    </>
  );
};

export default Nav;
