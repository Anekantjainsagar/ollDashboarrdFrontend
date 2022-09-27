import { BASE_URL } from "../../../../Utils/index";
import React, { useState } from "react";
import axios from "axios";
import { css } from "glamor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import times from "../../../Topbar/times";
import BatchDetails from "./BatchDetails";

const Form = ({ getUserData, sales }) => {
  const [details, setDetails] = useState(false);
  const [height, setHeight] = useState();
  const [name, setName] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [age, setage] = useState();
  const [school, setschool] = useState();
  const [course, setcourse] = useState();
  const [source, setsource] = useState("Website");
  const [mode, setmode] = useState("none");
  const [type, settype] = useState("none");
  const [days, setdays] = useState([]);
  const [address, setaddress] = useState();
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  const [startDate, setstartDate] = useState(date);
  const [sessionsCount, setsessionsCount] = useState();
  const [stime, setstime] = useState("--");
  var index = stime === "--" ? times.indexOf(stime) : times.indexOf(stime) + 2;
  const [etime, setetime] = useState(times[index]);
  const [price, setprice] = useState();

  const [requirements, setRequirements] = useState({
    course: "",
    age: "",
    upload: "",
    type: "",
    mode: "",
    location: "",
    openings: "",
    skills: "",
    level: "",
    gender: "",
    language: "",
  });

  const postData = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/addUser`, {
      name,
      phone,
      email: email === undefined || email === "" ? "" : email,
      age: age === undefined || age === "" ? "" : age,
      school: school === undefined || school === "" ? "" : school,
      course: course === undefined || course === "" ? "" : course,
      source: source === undefined || source === "" ? "" : source,
      mode: mode === undefined || mode === "" ? "none" : mode,
      type: type === undefined || type === "" ? "none" : type,
      address,
      price: price === undefined || price === "" || price === null ? 0 : price,
      days,
      startDate:
        startDate === undefined || startDate === null || startDate === ""
          ? date
          : startDate,
      time: stime + " " + etime === " " ? "-- --" : stime + " " + etime,
      sessionsCount:
        sessionsCount === undefined ||
        sessionsCount === "" ||
        sessionsCount === null
          ? 0
          : sessionsCount,
      stage: "🔥 hot",
      status: "new",
      assignee: sales?.name,
    });
    console.log(res);
    if (res.status == 500) {
      alert("Internal server error");
    }

    if (res.data.message === "User Saved Successfully") {
      setemail("");
      setName("");
      setprice("");
      setschool("");
      setcourse("");
      setmode("");
      settype("");
      setdays("");
      setsource("");
      setstartDate("");
      setphone("");
      setage("");
      setsessionsCount("");
      setstime("");
      setetime("");
      setaddress("");
    }
    setTimeout(() => {
      getUserData();
    }, 500);

    const notify = () =>
      toast(res.data.message, {
        type: res.data.success
          ? "success"
          : res.data.message === "User Saved Successfully"
          ? "success"
          : "error",
      }).configure({
        bodyClassName: css({
          backgroundColor: "blue",
          height: "100%",
          width: "100%",
        }),
      });
    notify();
  };

  return (
    <>
      <div className="inputUserContainer">
        <form action="" style={{ width: "53vw" }}>
          <div className="inputSection">
            <div className="inputContainer">
              <input
                type="text"
                name="course"
                value={requirements.course}
                onChange={(e) =>
                  setRequirements({ ...requirements, course: e.target.value })
                }
                placeholder="Course Name"
                className="input"
              />
              <input
                type="number"
                name="age"
                value={requirements.age}
                onChange={(e) =>
                  setRequirements({ ...requirements, age: e.target.value })
                }
                placeholder="Age"
                className="input"
              />
              <button
                className="detailsBtn"
                onClick={(e) => {
                  setHeight(e.clientY);
                  e.preventDefault();
                  setDetails(!details);
                }}
              >
                Batch Details
              </button>
              <BatchDetails
                details={details}
                setDetails={setDetails}
                mode={mode}
                setmode={setmode}
                type={type}
                settype={settype}
                address={address}
                setaddress={setaddress}
                days={days}
                setdays={setdays}
                height={height}
                startDate={startDate}
                setstartDate={setstartDate}
                stime={stime}
                setstime={setstime}
                sessionsCount={sessionsCount}
                setsessionsCount={setsessionsCount}
                etime={etime}
                setetime={setetime}
                price={price}
                setprice={setprice}
              />
              <input
                type="text"
                name="age"
                value={requirements.upload}
                onChange={(e) =>
                  setRequirements({ ...requirements, upload: e.target.value })
                }
                placeholder="Upload"
                className="input"
              />
            </div>
            <div className="inputContainer">
              <input
                type="text"
                name="type"
                value={requirements.type}
                onChange={(e) =>
                  setRequirements({ ...requirements, type: e.target.value })
                }
                placeholder="Type"
                className="input"
              />
              <input
                type="text"
                name="mode"
                value={requirements.mode}
                onChange={(e) =>
                  setRequirements({ ...requirements, mode: e.target.value })
                }
                placeholder="Mode"
                className="input"
              />
              <input
                type="text"
                name="location"
                value={requirements.location}
                onChange={(e) =>
                  setRequirements({ ...requirements, location: e.target.value })
                }
                placeholder="Location"
                className="input"
              />
              <input
                type="text"
                name="openings"
                value={requirements.openings}
                onChange={(e) =>
                  setRequirements({ ...requirements, openings: e.target.value })
                }
                placeholder="Openings"
                className="input"
              />
            </div>
            <div className="inputContainer">
              <input
                type="text"
                name="skills"
                value={requirements.skills}
                onChange={(e) =>
                  setRequirements({ ...requirements, skills: e.target.value })
                }
                placeholder="Skills"
                className="input"
              />
              <input
                type="text"
                name="level"
                value={requirements.level}
                onChange={(e) =>
                  setRequirements({ ...requirements, level: e.target.value })
                }
                placeholder="Level"
                className="input"
              />
              <input
                type="text"
                name="gender"
                value={requirements.gender}
                onChange={(e) =>
                  setRequirements({ ...requirements, gender: e.target.value })
                }
                placeholder="Gender Pref"
                className="input"
              />
              <input
                type="text"
                name="language"
                value={requirements.language}
                onChange={(e) =>
                  setRequirements({ ...requirements, language: e.target.value })
                }
                placeholder="Language"
                className="input"
              />
            </div>
          </div>
          <button
            className="button"
            style={{ padding: "0.35rem 1rem", marginBottom: "0.75rem" }}
            onClick={postData}
          >
            Add Requirements
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </>
  );
};

export default Form;
