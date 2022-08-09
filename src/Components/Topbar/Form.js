import { BASE_URL } from "../../Utils/index";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import BatchDetails from "./BatchDetails";
import axios from "axios";

const Form = ({ usersData, getUserData }) => {
  const [details, setDetails] = useState(false);
  const [name, setName] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [age, setage] = useState();
  const [school, setschool] = useState();
  const [course, setcourse] = useState();
  const [source, setsource] = useState();
  const [mode, setmode] = useState();
  const [type, settype] = useState();
  const [address, setaddress] = useState();
  const [days, setdays] = useState();
  const [startDate, setstartDate] = useState();
  const [stime, setstime] = useState();
  const [sessionsCount, setsessionsCount] = useState();
  const [etime, setetime] = useState();

  const postData = async (e) => {
    e.preventDefault();
    let id = usersData.length + 1;
    const res = await axios.post(`${BASE_URL}/addUser`, {
      id,
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
      days,
      startDate,
      time: stime + " " + etime,
      sessionsCount,
    });
    console.log(res);
    console.log(stime);
    console.log(etime);

    if (res.status == 500) {
      alert("Internal server error");
    }

    if (res.data.message === "User Saved Successfully") {
      setemail("");
      setName("");
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
  };

  return (
    <>
      <div className="inputUserContainer">
        <h1>New Lead</h1>
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
                startDate={startDate}
                setstartDate={setstartDate}
                stime={stime}
                setstime={setstime}
                sessionsCount={sessionsCount}
                setsessionsCount={setsessionsCount}
                etime={etime}
                setetime={setetime}
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
            <IoIosAdd size={25} color="white" />
            Create Lead
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
