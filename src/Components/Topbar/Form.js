import { BASE_URL } from "../../Utils/index";
import React, { useState, useContext } from "react";
import BatchDetails from "./BatchDetails";
import axios from "axios";
import { css } from "glamor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import times from "./times";
import styles from "./style.module.css";
import AddDataModal from "./AddDataModal";
import StudentContext from "../Context/StudentsContext";
import { AiOutlineClose } from "react-icons/ai";
import B2BContext from "../../Monitor/Context/B2BContext";

const Form = ({ getUserData, sales }) => {
  const [details, setDetails] = useState(false);
  const [height, setHeight] = useState();
  const [name, setName] = useState();
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [age, setage] = useState();
  const [school, setschool] = useState();
  const [course, setcourse] = useState();
  const [source, setsource] = useState("Source");
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
  const [dataSaved, setDataSaved] = useState(false);
  const [dataLocation, setDataLocation] = useState({ x: "", y: "" });
  const [searchData, setSearchData] = useState("");
  const [sourceInput, setSourceInput] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false);
  const b2b = useContext(B2BContext);
  function openModal() {
    setIsOpen(true);
  }

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
        source: source === "Other" ? sourceInput : source,
        mode: mode === undefined || mode === "" ? "none" : mode,
        type: type === undefined || type === "" ? "none" : type,
        address,
        price:
          price === undefined || price === "" || price === null ? 0 : price,
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
        assignee: b2b?.login?.name,
        totalPrice,
      });
      if (res.status === 500) {
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

  const apiData = useContext(StudentContext);

  return (
    <>
      <AddDataModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        setDataSaved={setDataSaved}
        getUserData={getUserData}
      />
      <div className="inputUserContainer">
        <form action="" style={{ display: "flex", alignItems: "center" }}>
          <div className="inputSection">
            <div className="inputContainer">
              <input
                type="text"
                style={{ width: "19%" }}
                name="name"
                placeholder="Name *"
                required
                className="input"
                disabled={dataSaved}
                value={name?.length > 0 ? name : searchData}
                onClick={(e) => setDataLocation({ x: e.clientX, y: e.clientY })}
                onChange={(e) => {
                  setSearchData(e.target.value);
                  setDataSaved(false);
                }}
              />
              {dataSaved ? (
                <AiOutlineClose
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDataSaved(true);
                    setName("");
                    setphone("");
                    setemail("");
                    setschool("");
                    setSearchData("");
                    setDataSaved(false);
                  }}
                />
              ) : null}

              <div
                style={
                  searchData?.length > 0 && dataSaved === false
                    ? { display: "block", top: `${dataLocation.y + 20}px` }
                    : { display: "none" }
                }
                className={styles.selectSchool}
              >
                {apiData?.data
                  ?.filter((data) =>
                    data.name.toLowerCase().includes(searchData.toLowerCase())
                  )
                  .map((e, i) => {
                    return (
                      <div
                        onClick={() => {
                          setDataSaved(true);
                          setName(e.name);
                          setphone(e.mobile ? e.mobile : e.phone);
                          setemail(e.email);
                          setschool(
                            e.institute_name ? e.institute_name : e.school
                          );
                          setage(e?.age);
                          setSearchData("");
                        }}
                        key={i}
                      >
                        <p style={{ paddingBottom: "0.25rem" }}>{e.name}</p>
                        <p>{e.mobile ? e.mobile : e.phone}</p>
                      </div>
                    );
                  })}
                <button
                  className={styles.btn}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                    setDataSaved(true);
                    setSearchData("");
                  }}
                >
                  Add New
                </button>
              </div>
              {/* <input
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
                style={{width:"50%"}}
                name="school"
                value={school}
                onChange={(e) => setschool(e.target.value)}
                placeholder="School"
                className="input"
              /> */}
              <input
                type="text"
                style={{ width: "19%" }}
                value={course}
                name="course"
                onChange={(e) => setcourse(e.target.value)}
                placeholder="Course"
                className="input"
              />
              <button
                className="detailsBtn"
                style={{
                  width: "22%",
                  padding: "0.5rem 0.75rem",
                  margin: "0.65rem 0",
                }}
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
              <select
                name=""
                id=""
                value={source}
                style={{
                  backgroundColor: "#333",
                  width: "16%",
                  border: 0,
                  padding: "0.5rem 0",
                }}
                onChange={(e) => {
                  setsource(e.target.value);
                }}
              >
                <option value="Source" selected disabled>
                  Source
                </option>
                <option value="Event">Event</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Referral">Referral</option>
                <option value="Word of Mouth">Word of Mouth</option>
                <option value="Digital">Digital</option>
                <option value="Other">Other</option>
              </select>
              {source === "Other" ? (
                <input
                  type="text"
                  placeholder="Source"
                  value={sourceInput}
                  style={{ width: "20%" }}
                  onChange={(e) => {
                    setSourceInput(e.target.value);
                  }}
                />
              ) : null}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20%",
            }}
          >
            <button
              className="button"
              onClick={postData}
              style={{ width: "100%" }}
            >
              Save Lead
            </button>
          </div>
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
