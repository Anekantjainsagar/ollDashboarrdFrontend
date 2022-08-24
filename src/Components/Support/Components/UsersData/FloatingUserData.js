import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Utils/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import ShowModal from "./ShowModal";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { BiUpArrowAlt } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  templateMsg,
  setdata,
  usersData,
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
  const [mode, setmode] = useState();
  const [type, settype] = useState();
  const [days, setdays] = useState();
  const [stime, setstime] = useState(batchDetails?.time.split(" ")[0]);
  const [etime, setetime] = useState(batchDetails?.time.split(" ")[1]);
  const [displayComment, setdisplayComment] = useState(true);
  const [comments, setcomments] = useState();
  const [stages, setstages] = useState();
  const [statuses, setstatuses] = useState();
  const [searchTemplate, setsearchTemplate] = useState();
  const [showTemplate, setshowTemplate] = useState(false);
  const [clickedTemplate, setclickedTemplate] = useState();
  const [templateUser, settemplateUser] = useState();
  const [height, setheight] = useState();

  useOutsideAlerter(sideRef, details, setDetails);

  const updateData = async (e) => {
    e.preventDefault();

    const obj = {
      _id: _id,
      name: nameVal === undefined ? name : nameVal,
      phone: number === undefined ? phone : number,
      email: emailName === undefined ? email : emailName,
      age: userAge === undefined ? age : userAge,
      school: schoolName === undefined ? school : schoolName,
      course: courseName === undefined ? course : courseName,
      source: sourcePlatform === undefined ? source : sourcePlatform,
      mode: mode === undefined ? batchDetails?.mode : mode,
      type: type === undefined ? batchDetails?.type : type,
      address: address === undefined ? batchDetails?.address : address,
      days: days === undefined ? batchDetails?.days : days,
      status: statuses === undefined ? status : statuses,
      stage: stages === undefined ? stage : stages,
      startDate:
        sourceTime === undefined ? batchDetails?.startDate : sourceTime,
      time: stime + " " + etime,
      sessionsCount:
        NoSessions === undefined ? batchDetails?.sessionsCount : NoSessions,
      price: price === undefined ? batchDetails?.price : price,
      cCode,
    };
    await axios.put(`${BASE_URL}/updateUser`, obj).then((res) => {
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
      }, 100);
      notify();
    });
  };

  const d = new Date(inqDate).toString();

  const handleKeyPress = (e) => {
    if (comments?.length > 0) {
      if (e.key === "Enter") {
        axios.put(`${BASE_URL}/comment`, {
          id: _id,
          comment: comments,
        });
        setcomments("");
        setTimeout(() => {
          getUserData();
        }, 500);
      }
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(e, data) {
    setIsOpen(true);
    setclickedTemplate(e);
    settemplateUser(data);
  }

  const print = () => {
    const { name, phone, course, batchDetails, source, id, inqDate, cCode } =
      data;
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = [
      "Id",
      "Name",
      "Phone",
      "Email",
      "Age",
      "School",
      "Course",
      "Source",
    ];
    var rows = [];

    var temp = [
      id,
      name,
      (cCode ? cCode : "+91") + phone,
      email,
      age,
      school,
      course,
      source,
    ];
    rows.push(temp);

    pdf.text(225, 40, `Lead : ${name}`, {
      halign: "center",
      valign: "middle",
    });
    pdf
      .setFontSize(10)
      .text(
        40,
        60,
        `Inquiry date : ${new Date(inqDate).toString().slice(0, 24)}`,
        {
          halign: "center",
          valign: "middle",
        }
      );
    pdf.setFontSize(10).text(40, 75, `Address : ${batchDetails.address}`, {
      halign: "center",
      valign: "middle",
    });
    pdf
      .setFontSize(10)
      .text(
        40,
        90,
        `Sessions starting from ${new Date(batchDetails.startDate)
          .toString()
          .slice(0, 16)} (${batchDetails?.time.split(" ")[0]} - ${
          batchDetails?.time.split(" ")[1]
        }) at Rs. ${batchDetails.price}/hour`,
        {
          halign: "center",
          valign: "middle",
        }
      );
    pdf
      .setFontSize(10)
      .text(
        40,
        105,
        `${batchDetails.mode} classes will be in ${batchDetails.type} mode`,
        {
          halign: "center",
          valign: "middle",
        }
      );
    pdf.autoTable(columns, rows, {
      startY: 115,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        fillColor: [166, 204, 247],
      },
    });
    pdf.save(`${name}`);
  };

  return (
    <>
      <ShowModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        clickedTemplate={clickedTemplate}
        templateUser={templateUser}
      />
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
        <div className="header" onContextMenu={(e) => e.stopPropagation()}>
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
              {(statuses === undefined ? status : statuses) === "new" ? (
                <BiUpArrowAlt size={30} color={"rgba(242, 115, 115, 1)"} />
              ) : (statuses === undefined ? status : statuses) === "follow" ||
                (statuses === undefined ? status : statuses) === "offReady" ? (
                <BiUpArrowAlt
                  size={30}
                  color={"rgba(255, 161, 74, 1)"}
                  style={{ transform: "rotate(-45deg)" }}
                />
              ) : (statuses === undefined ? status : statuses) === "noCourse" ||
                (statuses === undefined ? status : statuses) === "noBatch" ? (
                <FaGripLines size={30} color={"rgba(255, 245, 0, 1)"} />
              ) : (
                <FaGripLines size={30} color={"rgba(0, 255, 56, 1)"} />
              )}
              <p style={{ fontSize: "1.1rem" }}>
                {(statuses === undefined ? status : statuses) === "new"
                  ? "URG"
                  : (statuses === undefined ? status : statuses) === "follow" ||
                    (statuses === undefined ? status : statuses) === "offReady"
                  ? "High"
                  : (statuses === undefined ? status : statuses) ===
                      "noCourse" ||
                    (statuses === undefined ? status : statuses) === "noBatch"
                  ? "Med."
                  : "Low"}
              </p>
            </div>
            <select
              name=""
              id=""
              ref={statusRef}
              className={statuses === undefined ? status : statuses}
              value={statuses === undefined ? status : statuses}
              onChange={(e) => {
                setstatuses(e.target.value);
              }}
            >
              <option className="new" value="new">
                New
              </option>
              <option className="noTeacher" value="noTeacher">
                !Teacher
              </option>
              <option className="follow" value="follow">
                Fol. Up
              </option>
              <option className="noCourseName" value="noCourse">
                !Course
              </option>
              <option className="offReady" value="offReady">
                Offer Ready
              </option>
              <option className="started" value="started">
                Started
              </option>
              <option className="noPay" value="noPay">
                !Pay
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
        <div className="commentContainer">
          <p>Comments</p>
          <input
            type="text"
            name="comment"
            value={comments}
            onChange={(e) => setcomments(e.target.value)}
            placeholder="Add Comment"
            onKeyPress={handleKeyPress}
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
              comment.map(({ msg, date }, i) => {
                return (
                  <div className="commentsDisplay" key={i}>
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
            <CopyToClipboard
              text={`${name} ${phone} ${email} ${school} ${source} ${d.slice(
                4,
                21
              )}`}
              onCopy={() => {
                print();
                const notify = () => {
                  toast("Copied successfully", { type: "success" });
                };
                notify();
              }}
            >
              <button className="btn">SHARE</button>
            </CopyToClipboard>
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
