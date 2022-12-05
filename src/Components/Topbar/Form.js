import { BASE_URL } from "../../Utils/index";
import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import BatchDetails from "./BatchDetails";
import axios from "axios";
import { css } from "glamor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [totalPrice, settotalPrice] = useState();

  const postData = async (e) => {
    e.preventDefault();

    if (source === undefined || source === "" || source.length < 0) {
      const notifyBySource = () =>
        toast("Source is required", {
          type: "error",
        }).configure({
          bodyClassName: css({
            backgroundColor: "blue",
            height: "100%",
            width: "100%",
          }),
        });
      notifyBySource();
    } else {
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
        totalPrice,
      });
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
        settotalPrice("");
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
    }
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
                totalPrice={totalPrice}
                settotalPrice={settotalPrice}
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
