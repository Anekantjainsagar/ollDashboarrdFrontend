import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../Utils/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowModal from "./ShowModal";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
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
  sales,
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
    assignee,
    inqDate,
    oprationalStage,
  } = data;

  const stageRef = useRef(null);
  const sideRef = useRef(null);
  const [displayComment, setdisplayComment] = useState(true);
  const [comments, setcomments] = useState();
  const [type, setType] = useState("new");
  const [clickedTemplate, setclickedTemplate] = useState();
  const [templateUser, settemplateUser] = useState();

  useOutsideAlerter(sideRef, details, setDetails);

  const d = new Date(inqDate).toString();

  const handleKeyPress = (e) => {
    if (
      comments.length > 0 &&
      comments !== " " &&
      comments !== "  " &&
      comments !== "   "
    ) {
      if (e.key === "Enter") {
        axios.put(`${BASE_URL}/comment`, {
          id: _id,
          comment: comments,
          user: sales?.name,
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
          <p style={{ fontSize: "1.6rem", color: "white" }}>OLL - {id}</p>
          <div style={{ width: "50%" }}>
            <p
              style={{
                fontSize: "1.5rem",
                padding: "0.5rem 0.3rem",
                width: "100%",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                borderRadius: "1rem",
              }}
              value={status}
              className={status}
            >
              {status === "noCourse"
                ? "! NO COURSE"
                : status === "noTeacher"
                ? "! NO TEACHER"
                : "! NO BATCH"}
            </p>
            <select
              style={{
                width: "100%",
                marginTop: "0.75rem",
                textAlign: "center",
              }}
              ref={stageRef}
              value={oprationalStage ? oprationalStage : type}
              className={oprationalStage ? oprationalStage : type}
              onChange={async (e) => {
                e.stopPropagation();
                setType(e.target.value);
                await axios
                  .put(`${BASE_URL}/setOprationalStage`, {
                    id: _id,
                    newStage: e.target.value,
                  })
                  .then((response) => {
                    if (response.data.acknowledged === true) {
                      getUserData();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {status === "noTeacher" ? (
                <>
                  <option className="new" value="new">
                    New
                  </option>
                  <option className="posted" value="posted">
                    Posted
                  </option>
                  <option className="onBoarded" value="onBoarded">
                    Onboarded
                  </option>
                  <option className="notFound" value="notFound">
                    Not Found
                  </option>
                  <option className="readyToTeach" value="readyToTeach">
                    Ready to teach
                  </option>
                </>
              ) : status === "noBatch" ? (
                <>
                  <option className="new" value="new">
                    New
                  </option>
                  <option className="requested" value="requested">
                    Requested
                  </option>
                  <option className="added" value="added">
                    Added
                  </option>
                  <option className="batchReady" value="batchReady">
                    Batch Ready
                  </option>
                  <option className="noTeacher" value="noTeacher">
                    No Teacher
                  </option>
                </>
              ) : (
                <>
                  <option className="new" value="new">
                    New
                  </option>
                  <option className="posted" value="posted">
                    Posted
                  </option>
                  <option className="onBoarded" value="onBoarded">
                    Onboarded
                  </option>
                  <option className="verifying" value="verifying">
                    Verifying
                  </option>
                  <option className="courseReady" value="courseReady">
                    Course Ready
                  </option>
                  <option className="noBatch" value="noBatch">
                    No Batch
                  </option>
                </>
              )}
            </select>
          </div>
          <AiOutlineClose
            size={18}
            color="white"
            onClick={() => {
              setDetails(!details);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <p
          className="nameInput"
          style={{
            padding: 0,
            backgroundColor: "transparent",
            fontSize: "2.5rem",
            fontWeight: "700",
            margin: "1.8rem 0 0.75rem 0",
          }}
        >
          {name}
        </p>
        <div className="inqDetailsContainer">
          <p className="head" style={{ marginBottom: "1.25rem" }}>
            Inquiry Details
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "0.6rem 0",
            }}
          >
            <p style={{ fontSize: "1.6rem" }}>Course :</p>
            <p style={{ fontSize: "1.6rem", marginLeft: "1.9rem" }}>{course}</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "0.6rem 0",
            }}
          >
            <p style={{ fontSize: "1.6rem" }}>Time :</p>
            <div
              style={{
                marginLeft: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "72%",
              }}
            >
              <p>
                {batchDetails?.days.map((e) => {
                  return (
                    <p style={{ fontSize: "1.6rem" }}>
                      {e.charAt(0).toUpperCase() + e.slice(1)}
                    </p>
                  );
                })}
              </p>
              <p style={{ fontSize: "1.6rem" }}>
                {batchDetails?.time?.split(" ")[0]}
                {" - "}
                {batchDetails?.time?.split(" ")[1]}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "0.6rem 0",
            }}
          >
            <p style={{ fontSize: "1.6rem" }}>Sessions :</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "0.5rem",
                width: "72%",
              }}
            >
              <p style={{ fontSize: "1.6rem" }}>
                {batchDetails?.sessionsCount}
                {" Sessions"}
              </p>
              <p style={{ fontSize: "1.6rem" }}>
                Rs.{batchDetails?.price}/hour
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "0.6rem 0",
            }}
          >
            <p style={{ fontSize: "1.6rem" }}>Type :</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "3.5rem",
                width: "72%",
              }}
            >
              <p style={{ fontSize: "1.6rem" }}>{batchDetails?.mode}</p>
              <p style={{ fontSize: "1.6rem" }}>{batchDetails?.type}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "0.6rem 0",
            }}
          >
            <p style={{ fontSize: "1.6rem" }}>Source :</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "2rem",
                width: "72%",
              }}
            >
              <p style={{ fontSize: "1.6rem" }}>{source}</p>
              <p style={{ fontSize: "1.6rem" }}>
                {new Date(batchDetails?.startDate).toString().slice(4, 24)}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "0.6rem 0",
            }}
          >
            <p style={{ fontSize: "1.6rem" }}>Address :</p>
            <p style={{ fontSize: "1.6rem", paddingLeft: "3rem" }}>
              {batchDetails?.address}
            </p>
          </div>
        </div>
        <div className="inqReports">
          <div className="header">
            <p className="head">Issue Reports</p>
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
            <div className="container1" style={{ margin: ".6rem 0" }}>
              <p>Start Time : {d.slice(4, 21)}</p>
              <p>Due Time : </p>
            </div>
            <div className="container2" style={{ margin: ".6rem 0" }}>
              <p>End Time : </p>
              <p>Assignee : {assignee ? assignee : "Samantha"}</p>
            </div>
          </div>
        </div>
        <div className="commentContainer" style={{ marginTop: "1.25rem" }}>
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
              console.log(
                "Answer is " + comment.length > 0 &&
                  comment !== " " &&
                  comment !== "  " &&
                  comment !== "   "
              );
              if (
                comment.length > 0 &&
                comment !== " " &&
                comment !== "  " &&
                comment !== "   "
              ) {
                axios.put(`${BASE_URL}/comment`, {
                  id: _id,
                  comment: comments,
                  user: sales?.name,
                });
                setcomments("");
                setTimeout(() => {
                  getUserData();
                }, 500);
              }
            }}
          />
        </div>
        {comment.length > 0 ? (
          <>
            {displayComment ? (
              <div className="commentsDisplay">
                <h3>
                  {comment[comment.length - 1].user
                    ? comment[comment.length - 1].user
                    : "Samantha"}
                </h3>
                <h6>{comment[comment.length - 1].msg}</h6>
                <p>
                  {new Date(comment[comment.length - 1].date)
                    .toString()
                    .slice(3, 21)}
                </p>
              </div>
            ) : (
              comment.map(({ msg, date, user }, i) => {
                return (
                  <div className="commentsDisplay" key={i}>
                    <h3>{user ? user : "Samantha"}</h3>
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
      </div>
    </>
  );
};

export default FloatingUserData;
