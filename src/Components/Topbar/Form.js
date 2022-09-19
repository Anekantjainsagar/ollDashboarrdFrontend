import { BASE_URL } from "../../Utils/index";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import BatchDetails from "./BatchDetails";
import axios from "axios";
import { css } from "glamor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import times from "./times";

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
  const [mode, setmode] = useState("Online");
  const [type, settype] = useState("group");
  const [days, setdays] = useState([]);
  const [address, setaddress] = useState();
  const [startDate, setstartDate] = useState();
  const [sessionsCount, setsessionsCount] = useState();
  const [stime, setstime] = useState("09:00AM");
  var index = times.indexOf(stime);
  const [etime, setetime] = useState(times[index + 2]);
  const [price, setprice] = useState();

  const postData = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/addUser`, {
      name,
      phone,
      email,
      age,
      school,
      course,
      source,
      mode,
      type,
      address,
      price,
      days,
      startDate:
        startDate === undefined || startDate === null ? new Date() : startDate,
      time:
        stime + " " + etime === " " ? "09:00AM 10:00AM" : stime + " " + etime,
      sessionsCount,
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
        <form action="">
          <div className="inputSection">
            <div className="inputContainer">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name *"
                required
                className="input"
              />
              <input
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Phone *"
                required
                className="input inputPhone"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
                className="input"
              />
              <input
                type="number"
                value={age}
                name="age"
                onChange={(e) => setage(e.target.value)}
                placeholder="Age"
                className="input"
                min={1}
                max={100}
              />
            </div>
            <div className="inputContainer">
              <input
                type="text"
                name="school"
                value={school}
                onChange={(e) => setschool(e.target.value)}
                placeholder="School"
                className="input"
              />
              <input
                type="text"
                value={course}
                name="course"
                onChange={(e) => setcourse(e.target.value)}
                placeholder="Course"
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
                value={source}
                name="source"
                onChange={(e) => setsource(e.target.value)}
                placeholder="Source *"
                required
                className="input"
              />
            </div>
          </div>
          <button className="button" onClick={postData}>
            Save Lead
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
