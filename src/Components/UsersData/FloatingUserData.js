import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import countryData from "./countryData";
import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlineCopy,
  AiOutlineRight,
} from "react-icons/ai";
import { BiUpArrowAlt } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { ImPhone } from "react-icons/im";

function useOutsideAlerter(ref, show, setShow) {
  useEffect(() => {
    if (show) {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, show, setShow]);
}

const FloatingUserData = ({
  details,
  setDetails,
  data,
  getUserData,
  setstatusChanged,
  templateMsg,
}) => {
  const {
    name,
    phone,
    email,
    age,
    school,
    course,
    batchDetails,
    source,
    id,
    _id,
    comment,
    status,
    stage,
    inqDate,
  } = data;

  const stageRef = useRef(null);
  const statusRef = useRef(null);
  const sideRef = useRef(null);
  const [nameVal, setnameVal] = useState();
  const [cCode, setcCode] = useState("+91");
  const [number, setNumber] = useState();
  const [userAge, setuserAge] = useState();
  const [emailName, setemailName] = useState();
  const [schoolName, setschoolName] = useState();
  const [address, setaddress] = useState();
  const [courseName, setCourseName] = useState();
  const [NoSessions, setNoSessions] = useState();
  const [price, setprice] = useState();
  const [sourcePlatform, setsourcePlatform] = useState();
  const [sourceTime, setsourceTime] = useState();
  const [mode, setmode] = useState(batchDetails ? batchDetails.mode : null);
  const [type, settype] = useState(batchDetails.type);
  const [days, setdays] = useState(batchDetails.days);
  const [stime, setstime] = useState(batchDetails.time.split(" ")[0]);
  const [etime, setetime] = useState(batchDetails.time.split(" ")[1]);
  const [displayComment, setdisplayComment] = useState(true);
  const [comments, setcomments] = useState();
  const [stages, setstages] = useState();
  const [statuses, setstatuses] = useState();
  const [searchTemplate, setsearchTemplate] = useState();
  const [showTemplate, setshowTemplate] = useState(false);

  useOutsideAlerter(sideRef, details, setDetails);

  const updateData = (e) => {
    e.preventDefault();

    const obj = {
      id,
      name: nameVal === undefined ? name : nameVal,
      phone: number === undefined ? phone : number,
      email: emailName === undefined ? email : emailName,
      age: userAge === undefined ? age : userAge,
      school: schoolName === undefined ? school : schoolName,
      course: courseName === undefined ? course : courseName,
      source: sourcePlatform === undefined ? source : sourcePlatform,
      mode: mode === undefined ? batchDetails.mode : mode,
      type: type === undefined ? batchDetails.type : type,
      address: address === undefined ? batchDetails.address : address,
      days: days === undefined ? batchDetails.days : days,
      status: statuses === undefined ? status : statuses,
      stage: stages === undefined ? stage : stages,
      startDate: sourceTime === undefined ? batchDetails.startDate : sourceTime,
      time: stime + " " + etime,
      sessionsCount:
        NoSessions === undefined ? batchDetails.sessionsCount : NoSessions,
      price: price === undefined ? batchDetails.price : price,
      cCode
    };

    axios.put(`${BASE_URL}/updateUser`, obj).then((res) => {
      const notify = () =>
        toast(
          res.data.acknowledged
            ? "Data updated successfully"
            : "Internal sever error",
          { type: res.data.acknowledged ? "success" : "error" }
        ).configure({
          bodyClassName: css({
            backgroundColor: "blue",
            height: "100%",
            width: "100%",
          }),
        });
      setTimeout(() => {
        getUserData();
        setstatusChanged(true);
      }, 1000);
      notify();
    });
  };

  const d = new Date(inqDate).toString();

  return (
    <>
      <div style={{ position: "absolute" }}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <div
        ref={sideRef}
        onClick={(e) => e.stopPropagation()}
        className={
          details === true
            ? "animate offerDetailContainer"
            : "null offerDetailContainer"
        }
      >
        <div className="header">
          <p>OLL - {id}</p>
          <div style={{ display: "flex" }}>
            <div
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {((statuses===undefined) ? status : statuses) === "new" ? (
                <BiUpArrowAlt size={30} color={"rgba(242, 115, 115, 1)"} />
              ) : ((statuses===undefined) ? status : statuses) === "follow" ? (
                <BiUpArrowAlt
                  size={30}
                  color={"rgba(255, 161, 74, 1)"}
                  style={{ transform: "rotate(-45deg)" }}
                />
              ) : ((statuses===undefined) ? status : statuses) === "noCourse" ? (
                <FaGripLines size={30} color={"rgba(255, 245, 0, 1)"} />
              ) : (
                <FaGripLines size={30} color={"rgba(0, 255, 56, 1)"} />
              )}
              <p style={{ fontSize: "1.1rem" }}>
                {((statuses===undefined) ? status : statuses) === "new"
                  ? "URG"
                  : ((statuses===undefined) ? status : statuses) === "follow"
                  ? "High"
                  : ((statuses===undefined) ? status : statuses) === "noCourse"
                  ? "Med."
                  : "Low"}
              </p>
            </div>
            <select
              name=""
              id=""
              ref={statusRef}
              className={((statuses===undefined) ? status : statuses)}
              value={(statuses===undefined) ? status : statuses}
              onChange={(e) => {
                setstatuses(e.target.value);
              }}
            >
              <option className="new" value="new">
                New
              </option>
              <option className="follow" value="follow">
                Fol. Up
              </option>
              <option className="noCourseName" value="noCourse">
                !Course
              </option>
              <option className="started" value="started">
                Started
              </option>
              <option className="noBatch" value="noBatch">
                !Batch
              </option>
            </select>
          </div>
          <select
            style={{ width: "19%" }}
            name=""
            ref={stageRef}
            id=""
            onChange={(e) => {
              setstages(e.target.value);
            }}
            className={stages === undefined ? stage : stages}
            value={stages === undefined ? stage : stages}
          >
            <option className="hot" value="🔥 hot">
              🔥 Hot
            </option>
            <option className="warm" value="🥵 warm">
              🥵 Warm
            </option>
            <option className="cold" value="🥶 cold">
              🥶 Cold
            </option>
            <option className="won" value="🥳 won">
              🥳 Won
            </option>
          </select>
          <AiOutlineClose
            size={18}
            color="white"
            onClick={() => {
              setDetails(!details);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "1.8rem 0 0.5rem 0",
          }}
        >
          <input
            value={nameVal === undefined ? name : nameVal}
            onChange={(e) => setnameVal(e.target.value)}
            className="nameInput"
          />
          <button className="button" onClick={updateData}>
            Save changes
          </button>
        </div>
        <div className="contactInfo">
          <div className="container">
            <select
              style={{
                width: "17%",
              }}
              value={cCode}
              className="codeSelector"
              onChange={(e) => setcCode(e.target.value)}
            >
              {countryData.map((e) => {
                return (
                  <option
                    style={{
                      backgroundColor: "#444444",
                      color: "white",
                      fontWeight: 500,
                      padding: "0 1rem",
                    }}
                    value={e.dial_code}
                  >
                    {e.dial_code} - {e.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              style={{ width: "35%" }}
              value={number === undefined ? phone : number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input
              type="text"
              style={{ width: "44%" }}
              value={emailName === undefined ? email : emailName}
              onChange={(e) => setemailName(e.target.value)}
            />
          </div>
          <div className="container">
            <input
              type="number"
              style={{ width: "17%" }}
              value={userAge === undefined ? age : userAge}
              max={20}
              min={1}
              onChange={(e) => setuserAge(e.target.value)}
            />
            <input
              type="text"
              style={{ width: "36%" }}
              value={schoolName === undefined ? school : schoolName}
              onChange={(e) => setschoolName(e.target.value)}
            />
            <input
              type="text"
              style={{ width: "43%" }}
              value={address === undefined ? batchDetails.address : address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
        </div>
        <div className="contactContainer">
          <p>Contact</p>
          <div className="container">
            <a href="tel:9920188188">
              <ImPhone size={30} color={"white"} className="iconStyle" />
            </a>
            <AiOutlineMail
              size={30}
              color={"white"}
              onClick={() => window.open("https://mail.google.com/mail/u/0")}
              className="iconStyle"
            />
            <AiOutlineCopy
              size={30}
              onClick={() => {
                navigator.clipboard.writeText(name + " " + phone + " " + email);
                const notify = () => {
                  toast("Copied successfully", { type: "success" });
                };
                notify();
              }}
              color={"white"}
              className="iconStyle"
            />
            <div className="btn" onClick={() => setshowTemplate(!showTemplate)}>
              <BsWhatsapp
                size={20}
                style={{ marginRight: "0.3rem" }}
                color={"#0ac032"}
              />
              Template
            </div>
            <div
              style={showTemplate ? { display: "block" } : { display: "none" }}
              className="templateBox"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <p className="heading" style={{ fontWeight: 500 }}>
                Select a Template
              </p>
              <div className="content">
                {templateMsg
                  ? templateMsg
                      .filter((e) => {
                        if (searchTemplate) {
                          if (
                            e.elementName.toLowerCase().includes(searchTemplate)
                          ) {
                            return e;
                          }
                        } else {
                          return e;
                        }
                        return 0;
                      })
                      .map((template) => {
                        return template.elementName.length > 0 ? (
                          <div>
                            <p style={{ fontWeight: 500 }}>
                              {template.elementName}.
                            </p>
                            <div className="line"></div>
                          </div>
                        ) : (
                          <p style={{ color: "white", fontSize: "2rem" }}>
                            No template found
                          </p>
                        );
                      })
                  : null}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={searchTemplate}
                  onChange={(e) => setsearchTemplate(e.target.value)}
                  placeholder="Search templates..."
                />
              </div>
            </div>
            <div
              className="btn"
              onClick={() =>
                window.open("https://live-11507.wati.io/teamInbox/")
              }
            >
              <BsWhatsapp
                size={20}
                style={{ marginRight: "0.3rem" }}
                color={"#0ac032"}
              />
              History
            </div>
          </div>
        </div>
        <div className="inqDetailsContainer">
          <p className="head">Inquiry Details</p>
          <div>
            <p>Course :</p>
            <input
              type="text"
              style={{ width: "78%" }}
              value={courseName === undefined ? course : courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <p style={{ marginTop: "1rem" }}>Time :</p>
            <div className="selectModes" style={{ width: "30%" }}>
              <div
                className="selectMode"
                name="days"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                }}
                value={days}
                onChange={(e) => setdays(e.target.value)}
              >
                <p>Days</p>
                <div
                  style={{
                    margin: "0.75rem 0",
                    paddingLeft: "0.15rem",
                    display: "flex",
                  }}
                >
                  <input
                    style={{ color: "black", cursor: "pointer" }}
                    type={"radio"}
                    name="days"
                    value={"MWF"}
                    checked={days === "MWF" ? true : false}
                  />
                  <p style={{ marginLeft: "0.4rem" }}>MWF</p>
                </div>
                <div
                  style={{
                    margin: "0.75rem 0",
                    paddingLeft: "0.15rem",
                    display: "flex",
                  }}
                >
                  <input
                    style={{ color: "black", cursor: "pointer" }}
                    type={"radio"}
                    name="days"
                    checked={days === "TTF" ? true : false}
                    value={"TTF"}
                  />
                  <p style={{ marginLeft: "0.4rem" }}>TTF</p>
                </div>
                <div
                  style={{
                    margin: "0.75rem 0",
                    paddingLeft: "0.15rem",
                    display: "flex",
                  }}
                >
                  <input
                    style={{ color: "black", cursor: "pointer" }}
                    checked={days === "SS" ? true : false}
                    type={"radio"}
                    name="days"
                    value={"SS"}
                  />
                  <p style={{ marginLeft: "0.4rem" }}>SS</p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <select
                style={{ width: "100%", fontWeight: "500" }}
                name="stime"
                value={stime}
                className="valueSelector"
                onChange={(e) => {
                  setstime(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value={"09:00AM"}>09:00AM</option>
                <option value={"09:30AM"}>09:30AM</option>
                <option value={"10:00AM"}>10:00AM</option>
                <option value={"10:30AM"}>10:30AM</option>
                <option value={"11:00AM"}>11:00AM</option>
                <option value={"11:30AM"}>11:30AM</option>
                <option value={"12:00PM"}>12:00PM</option>
                <option value={"12:30PM"}>12:30PM</option>
                <option value={"01:00PM"}>01:00PM</option>
                <option value={"01:30PM"}>01:30PM</option>
                <option value={"02:00PM"}>02:00PM</option>
                <option value={"02:30PM"}>02:30PM</option>
                <option value={"03:00PM"}>03:00PM</option>
                <option value={"03:30PM"}>03:30PM</option>
                <option value={"04:00PM"}>04:00PM</option>
                <option value={"04:30PM"}>04:30PM</option>
                <option value={"05:00PM"}>05:00PM</option>
                <option value={"05:30PM"}>05:30PM</option>
                <option value={"06:00PM"}>06:00PM</option>
                <option value={"06:30PM"}>06:30PM</option>
                <option value={"07:00PM"}>07:00PM</option>
                <option value={"07:30PM"}>07:30PM</option>
                <option value={"08:00PM"}>08:00PM</option>
                <option value={"08:30PM"}>08:30PM</option>
                <option value={"09:00PM"}>09:00PM</option>
                <option value={"09:30PM"}>09:30PM</option>
                <option value={"10:00PM"}>10:00PM</option>
                <option value={"10:30PM"}>10:30PM</option>
                <option value={"11:00PM"}>11:00PM</option>
                <option value={"11:30PM"}>11:30PM</option>
                <option value={"12:00AM"}>12:00AM</option>
                <option value={"12:30AM"}>12:30AM</option>
                <option value={"01:00AM"}>01:00AM</option>
                <option value={"01:30AM"}>01:30AM</option>
                <option value={"02:00AM"}>02:00AM</option>
                <option value={"02:30AM"}>02:30AM</option>
                <option value={"03:00AM"}>03:00AM</option>
                <option value={"03:30AM"}>03:30AM</option>
                <option value={"04:00AM"}>04:00AM</option>
                <option value={"04:30AM"}>04:30AM</option>
                <option value={"05:00AM"}>05:00AM</option>
                <option value={"05:30AM"}>05:30AM</option>
                <option value={"06:00AM"}>06:00AM</option>
                <option value={"06:30AM"}>06:30AM</option>
                <option value={"07:00AM"}>07:00AM</option>
                <option value={"07:30AM"}>07:30AM</option>
                <option value={"08:00AM"}>08:00AM</option>
                <option value={"08:30AM"}>08:30AM</option>
              </select>
              <select
                style={{ width: "100%", margin: "1rem 0", fontWeight: "500" }}
                name="etime"
                value={etime}
                className="valueSelector"
                onChange={(e) => {
                  setetime(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value={"09:00AM"}>09:00AM</option>
                <option value={"09:30AM"}>09:30AM</option>
                <option value={"10:00AM"}>10:00AM</option>
                <option value={"10:30AM"}>10:30AM</option>
                <option value={"11:00AM"}>11:00AM</option>
                <option value={"11:30AM"}>11:30AM</option>
                <option value={"12:00PM"}>12:00PM</option>
                <option value={"12:30PM"}>12:30PM</option>
                <option value={"01:00PM"}>01:00PM</option>
                <option value={"01:30PM"}>01:30PM</option>
                <option value={"02:00PM"}>02:00PM</option>
                <option value={"02:30PM"}>02:30PM</option>
                <option value={"03:00PM"}>03:00PM</option>
                <option value={"03:30PM"}>03:30PM</option>
                <option value={"04:00PM"}>04:00PM</option>
                <option value={"04:30PM"}>04:30PM</option>
                <option value={"05:00PM"}>05:00PM</option>
                <option value={"05:30PM"}>05:30PM</option>
                <option value={"06:00PM"}>06:00PM</option>
                <option value={"06:30PM"}>06:30PM</option>
                <option value={"07:00PM"}>07:00PM</option>
                <option value={"07:30PM"}>07:30PM</option>
                <option value={"08:00PM"}>08:00PM</option>
                <option value={"08:30PM"}>08:30PM</option>
                <option value={"09:00PM"}>09:00PM</option>
                <option value={"09:30PM"}>09:30PM</option>
                <option value={"10:00PM"}>10:00PM</option>
                <option value={"10:30PM"}>10:30PM</option>
                <option value={"11:00PM"}>11:00PM</option>
                <option value={"11:30PM"}>11:30PM</option>
                <option value={"12:00AM"}>12:00AM</option>
                <option value={"12:30AM"}>12:30AM</option>
                <option value={"01:00AM"}>01:00AM</option>
                <option value={"01:30AM"}>01:30AM</option>
                <option value={"02:00AM"}>02:00AM</option>
                <option value={"02:30AM"}>02:30AM</option>
                <option value={"03:00AM"}>03:00AM</option>
                <option value={"03:30AM"}>03:30AM</option>
                <option value={"04:00AM"}>04:00AM</option>
                <option value={"04:30AM"}>04:30AM</option>
                <option value={"05:00AM"}>05:00AM</option>
                <option value={"05:30AM"}>05:30AM</option>
                <option value={"06:00AM"}>06:00AM</option>
                <option value={"06:30AM"}>06:30AM</option>
                <option value={"07:00AM"}>07:00AM</option>
                <option value={"07:30AM"}>07:30AM</option>
                <option value={"08:00AM"}>08:00AM</option>
                <option value={"08:30AM"}>08:30AM</option>
              </select>
            </div>
          </div>
          <div>
            <p>Sessions :</p>
            <div
              style={{ display: "flex", justifyContent: "end", width: "78%" }}
            >
              <input
                type="text"
                style={{ width: "50%", marginRight: "1rem" }}
                value={
                  NoSessions === undefined
                    ? batchDetails.sessionsCount
                    : NoSessions
                }
                onChange={(e) => {
                  setNoSessions(e.target.value);
                }}
              />
              <div style={{ width: "50%" }}>
                <p>Rs. </p>
                <input
                  type="text"
                  style={{ width: "45%", textAlign: "center" }}
                  value={price === undefined ? batchDetails.price : price}
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
                <p>/hour</p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <p style={{ marginTop: "1rem" }}>Type :</p>
            <div
              className="selectModes"
              style={{ width: "80%", padding: "0 3rem" }}
            >
              <div
                className="selectMode"
                name="mode"
                value={mode}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                }}
                onChange={(e) => setmode(e.target.value)}
              >
                <p>Mode</p>
                <div
                  style={{
                    paddingLeft: "0.15rem",
                  }}
                >
                  <input
                    style={{ color: "black", cursor: "pointer" }}
                    type={"radio"}
                    name="mode"
                    checked={mode === "Online" ? true : false}
                    value={"Online"}
                  />
                  <p style={{ marginLeft: "0.4rem" }}>Onl.</p>
                </div>
                <div
                  style={{
                    paddingLeft: "0.15rem",
                    display: "flex",
                  }}
                >
                  <input
                    checked={mode === "Offline" ? true : false}
                    style={{ color: "black", cursor: "pointer" }}
                    type={"radio"}
                    name="mode"
                    value={"Offline"}
                  />
                  <p style={{ marginLeft: "0.4rem" }}>Off.</p>
                </div>
              </div>
              <div
                className="selectMode"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                }}
                value={type}
                onChange={(e) => settype(e.target.value)}
              >
                <p>Type</p>
                <div
                  style={{
                    paddingLeft: "0.15rem",
                    display: "flex",
                  }}
                >
                  <input
                    style={{ color: "black", cursor: "pointer" }}
                    type={"radio"}
                    checked={type === "1 to 1" ? true : false}
                    name="type"
                    value={"1 to 1"}
                  />
                  <p style={{ marginLeft: "0.4rem" }}>1 on 1</p>
                </div>
                <div
                  style={{
                    paddingLeft: "0.15rem",
                    display: "flex",
                  }}
                >
                  <input
                    style={{ color: "black", cursor: "pointer" }}
                    type={"radio"}
                    checked={type === "group" ? true : false}
                    value="group"
                    name="type"
                  />
                  <p style={{ marginLeft: "0.4rem" }}>Group</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>Source :</p>
            <div
              style={{ display: "flex", justifyContent: "end", width: "78%" }}
            >
              <input
                type="text"
                style={{ width: "50%", marginRight: "1rem" }}
                value={sourcePlatform === undefined ? source : sourcePlatform}
                onChange={(e) => {
                  setsourcePlatform(e.target.value);
                }}
              />
              <input
                type="text"
                style={{ width: "50%", textAlign: "center" }}
                value={
                  sourceTime === undefined
                    ? batchDetails.startDate.slice(0, 10)
                    : sourceTime.slice(0, 10)
                }
                onChange={(e) => {
                  setsourceTime(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="commentContainer">
          <p>Comments</p>
          <input
            type="text"
            name="comment"
            value={comments}
            onChange={(e) => setcomments(e.target.value)}
            placeholder="Add Comment"
          />
          <AiOutlineRight
            size={19}
            className="icon"
            onClick={() => {
              axios.put(`${BASE_URL}/comment`, {
                id: _id,
                comment: comments,
              });
              setcomments("");
              setTimeout(() => {
                getUserData();
              }, 500);
            }}
          />
        </div>
        {comment.length > 0 ? (
          <>
            {displayComment ? (
              <div className="commentsDisplay">
                <img
                  src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=463"
                  alt="this is a comment"
                />
                <h6>{comment[comment.length - 1].msg}</h6>
                <p>
                  {new Date(comment[comment.length - 1].date)
                    .toString()
                    .slice(3, 21)}
                </p>
              </div>
            ) : (
              comment.map(({ msg, date }) => {
                return (
                  <div className="commentsDisplay">
                    <img
                      src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=463"
                      alt="this is a comment"
                    />
                    <h6>{msg}</h6>
                    <p>{new Date(date).toString().slice(3, 21)}</p>
                  </div>
                );
              })
            )}
            {comment.length > 1 ? (
              <p
                className="viewALl"
                onClick={() => setdisplayComment(!displayComment)}
              >
                {displayComment ? "View all" : "Hide all"}
              </p>
            ) : null}
          </>
        ) : null}
        <div className="inqReports">
          <div className="header">
            <p className="head">Inquiry Reports</p>
            <button className="btn">SHARE</button>
          </div>
          <div className="content">
            <div className="container1">
              <p>Start Time : {d.slice(4, 21)}</p>
              <p>Due Time : </p>
            </div>
            <div className="container2">
              <p>End Time : </p>
              <p>Assignee : Saman</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingUserData;
