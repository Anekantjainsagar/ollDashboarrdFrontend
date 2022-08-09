import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/index";
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

const FloatingUserData = ({ details, setDetails, data, getUserData }) => {
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
  comment = comment.reverse()
  const stageRef = useRef(null);
  const statusRef = useRef(null);
  const sideRef = useRef(null);

  const [iconType, setIconType] = useState(0);

  const [number, setNumber] = useState(phone);
  const [emailName, setemailName] = useState(email);
  const [schoolName, setschoolName] = useState(school);
  const [userAge, setuserAge] = useState(age);
  const [address, setaddress] = useState(
    batchDetails ? batchDetails.address : null
  );
  const [cCode, setcCode] = useState("+91");
  const [courseName, setCourseName] = useState(course);
  const [NoSessions, setNoSessions] = useState(
    batchDetails ? `${batchDetails.sessionsCount} Sessions` : null
  );
  const [price, setprice] = useState("Rs. 850/hour");
  const [mode, setmode] = useState(batchDetails ? batchDetails.mode : null);
  const [type, settype] = useState(batchDetails.type);
  const [days, setdays] = useState(batchDetails.days);
  const [modeType, setmodeType] = useState(
    batchDetails ? batchDetails.type : null
  );
  const [sourcePlatform, setsourcePlatform] = useState(source);
  const [sourceTime, setsourceTime] = useState("12:05:02 PM");
  const [stime, setstime] = useState(batchDetails.time.split(" ")[0]);
  const [etime, setetime] = useState(batchDetails.time.split(" ")[1]);
  const [comments, setcomments] = useState();
  const [displayComment, setdisplayComment] = useState(false);
  useOutsideAlerter(sideRef, details, setDetails);

  return (
    <>
      <div
        ref={sideRef}
        onClick={(e) => e.stopPropagation()}
        className={
          details ? "animate offerDetailContainer" : "null offerDetailContainer"
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
              {iconType === 0 ? (
                <BiUpArrowAlt size={20} color={"rgba(242, 115, 115, 1)"} />
              ) : iconType === 1 ? (
                <BiUpArrowAlt
                  size={20}
                  color={"rgba(255, 161, 74, 1)"}
                  style={{ transform: "rotate(-45deg)" }}
                />
              ) : iconType === 2 ? (
                <FaGripLines size={20} color={"rgba(255, 245, 0, 1)"} />
              ) : (
                <FaGripLines size={20} color={"rgba(0, 255, 56, 1)"} />
              )}
              <p style={{ fontSize: "1rem" }}>
                {iconType === 0
                  ? "URG"
                  : iconType === 1
                  ? "High"
                  : iconType === 2
                  ? "Med."
                  : "Low"}
              </p>
            </div>
            <select
              name=""
              id=""
              ref={statusRef}
              className="new"
              onChange={() => {
                statusRef.current.className =
                  statusRef.current.options[
                    statusRef.current.options.selectedIndex
                  ].className;
                setIconType(stageRef.current.options.selectedIndex);
              }}
            >
              <option className="new" value="new">
                New
              </option>
              <option className="follow" value="follow">
                Follow Up
              </option>
              <option className="noCourseName" value="noCourse">
                ! No Course
              </option>
              <option className="started" value="started">
                Started
              </option>
              <option className="noBatch" value="noBatch">
                ! No Batch
              </option>
            </select>
          </div>
          <select
            style={{ width: "19%" }}
            name=""
            ref={stageRef}
            id=""
            onChange={() =>
              (stageRef.current.className =
                stageRef.current.options[
                  stageRef.current.options.selectedIndex
                ].className)
            }
            className="hot"
          >
            <option className="hot" value="hot">
              Hot
            </option>
            <option className="warm" value="warm">
              Warm
            </option>
            <option className="cold" value="cold">
              Cold
            </option>
            <option className="won" value="won">
              Won
            </option>
          </select>
          <AiOutlineClose
            size={18}
            color="white"
            onClick={() => setDetails(!details)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              marginTop: "2rem ",
              marginBottom: "0.75rem",
            }}
          >
            {name}
          </p>
          <button className="button">Save changes</button>
        </div>
        <div className="contactInfo">
          <div className="container">
            <input
              type="text"
              style={{ width: "17%" }}
              value={cCode}
              onChange={(e) => setcCode(e.target.value)}
            />
            <input
              type="text"
              style={{ width: "35%" }}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input
              type="text"
              style={{ width: "44%" }}
              value={emailName}
              onChange={(e) => setemailName(e.target.value)}
            />
          </div>
          <div className="container">
            <input
              type="number"
              style={{ width: "17%" }}
              value={userAge}
              max={20}
              min={1}
              onChange={(e) => setuserAge(e.target.value)}
            />
            <input
              type="text"
              style={{ width: "36%" }}
              value={schoolName}
              onChange={(e) => setschoolName(e.target.value)}
            />
            <input
              type="text"
              style={{ width: "43%" }}
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
        </div>
        <div className="contactContainer">
          <p>Contact</p>
          <div className="container">
            <ImPhone size={30} color={"white"} className="iconStyle" />
            <AiOutlineMail size={30} color={"white"} className="iconStyle" />
            <AiOutlineCopy size={30} color={"white"} className="iconStyle" />
            <div className="btn">
              <BsWhatsapp
                size={20}
                style={{ marginRight: "0.3rem" }}
                color={"#0ac032"}
              />
              Template
            </div>
            <div className="btn">
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
              value={courseName}
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
              <input
                type="time"
                style={{ width: "100%", margin: "1rem 0" }}
                name="time"
                value={stime}
                onChange={(e) => setstime(e.target.value)}
              />
              <input
                type="time"
                style={{ width: "100%" }}
                name="time"
                value={etime}
                onChange={(e) => setetime(e.target.value)}
              />
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
                value={NoSessions}
                onChange={(e) => {
                  setNoSessions(e.target.value);
                }}
              />
              <input
                type="text"
                style={{ width: "50%" }}
                value={price}
                onChange={(e) => {
                  setprice(e.target.value);
                }}
              />
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
                value={sourcePlatform}
                onChange={(e) => {
                  setsourcePlatform(e.target.value);
                }}
              />
              <input
                type="text"
                style={{ width: "50%" }}
                value={sourceTime}
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
              <h6 className="commentsDisplay">{comment[0]}</h6>
            ) : (
              comment.map((com) => {
                return <h6 className="commentsDisplay">{com}</h6>;
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
              <p>Start Time : {batchDetails.time.split(" ")[0]}</p>
              <p>Due Time : </p>
            </div>
            <div className="container2">
              <p>End Time : {batchDetails.time.split(" ")[1]}</p>
              <p>Assignee : {source}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingUserData;
