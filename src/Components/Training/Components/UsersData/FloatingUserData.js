import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillDelete,
  AiOutlineClose,
  AiOutlineCopy,
  AiOutlineRight,
} from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TRAINING_BACKEND from "../../utils";
import times from "../../../../Components/Topbar/times";
import { css } from "glamor";

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
  getRequirements,
  sales,
}) => {
  const { _id, comment } = data;

  const daysValue = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const postingsOptions = [
    "Linkedin",
    "Internshala",
    "TeachersOn",
    "Referral",
    "Google",
    "SuperProf",
  ];

  const sideRef = useRef(null);
  const [displayComment, setdisplayComment] = useState(true);
  const [cmntDeleteDisplay, setCmntDeleteDisplay] = useState(false);
  const [comments, setcomments] = useState("");
  const [stageValue, setStageValue] = useState();

  useOutsideAlerter(sideRef, details, setDetails);

  const [openings, setOpenings] = useState(undefined);
  const [eTime, setETime] = useState(undefined);
  const [postings, setPostings] = useState([]);
  const [requirements, setRequirements] = useState({
    course: undefined,
    type: undefined,
    model: undefined,
    assignee: undefined,
    days: [],
    location: undefined,
    sTime: undefined,
    startDate: undefined,
  });

  const updateData = async (e) => {
    e.preventDefault();

    const obj = {
      id: data?._id,
      course: requirements?.course ? requirements?.course : data?.course,
      type: requirements?.type ? requirements?.type : data?.type,
      model: requirements?.model ? requirements?.model : data?.model,
      assignee: requirements?.assignee
        ? requirements?.assignee
        : data?.assignee,
      days: requirements?.days.length > 0 ? requirements?.days : data?.days,
      location: requirements?.location
        ? requirements?.location
        : data?.location,
      sTime: requirements?.sTime ? requirements?.sTime : data?.sTime,
      startDate: requirements?.startDate
        ? requirements?.startDate
        : data?.startDate,
      eTime: eTime ? eTime : data?.eTime,
      openings: openings ? openings : data?.openings,
      postings: postings.length > 0 ? postings : data?.postings,
    };

    await axios
      .put(`${TRAINING_BACKEND}/updateRequirements`, obj)
      .then((res) => {
        if (res?.data) {
          if (postings.length > 0) {
            axios
              .put(`${TRAINING_BACKEND}/setStage`, {
                id: data?._id,
                newStage: "Posting",
              })
              .then((response) => {
                if (response?.data?.matchedCount > 0) {
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
                  setDetails(false);
                  getRequirements();
                  notify();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
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
            setDetails(false);
            getRequirements();
            notify();
          }
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`${TRAINING_BACKEND}/deleteComment`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
          userId: data?._id,
        },
      })
      .then((res) => {
        console.log(res);
        getRequirements();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div className="header" onContextMenu={(e) => e.stopPropagation()}>
          <p style={{ color: "white" }}>OLL - {data?.rid}</p>
          <select
            style={{ width: "35%" }}
            value={stageValue ? stageValue : data?.stage}
            className={stageValue?.length > 0 ? stageValue : data?.stage}
            onChange={async (e) => {
              e.stopPropagation();
              setStageValue(e.target.value);
              await axios
                .put(`${TRAINING_BACKEND}/setStage`, {
                  id: _id,
                  newStage: e.target.value,
                })
                .then((response) => {
                  if (response?.data?.modifiedCount > 0) {
                    getRequirements();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <option className="New" value="New">
              New
            </option>
            <option className="Posting" value="Posting">
              Posting
            </option>
            <option className="Filtering" value="Filtering">
              Filtering
            </option>
            <option className="Completed" value="Completed">
              Completed
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
            justifyContent: "space-between",
            margin: "0.5rem 0 1rem 0",
            alignItems: "center",
          }}
        >
          <input
            value={requirements?.course ? requirements?.course : data?.course}
            onChange={(e) =>
              setRequirements({ ...requirements, course: e.target.value })
            }
            className="nameInput"
          />
          <button className="button" onClick={updateData}>
            Save changes
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: "0.75rem 0",
            padding: "0 3rem",
          }}
        >
          <p style={{ fontSize: "1.75rem", fontWeight: "600" }}>
            Recruitment Form :
          </p>
          <CopyToClipboard
            text={`${window.location.href}/teacherOnboarding/${data?._id}`}
            onCopy={() => {
              window.open(
                `${window.location.href}/teacherOnboarding/${data?._id}`
              );
            }}
          >
            <button
              style={{
                backgroundColor: "transparent",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <AiOutlineCopy size={15} style={{ marginRight: "0.25rem" }} />
              Copy
            </button>
          </CopyToClipboard>
        </div>
        <div className="postings">
          <h1>Postings</h1>
          <div className="container">
            {postingsOptions?.map((e) => {
              return (
                <div className="box">
                  <input
                    type="checkbox"
                    id={e}
                    name={e}
                    value={e}
                    checked={
                      postings.length > 0
                        ? postings.includes(e)
                        : data?.postings.includes(e)
                    }
                    onChange={async (e) => {
                      if (postings.includes(e.target.value) === false) {
                        if (e.target.checked === true) {
                          setPostings([...postings, e.target.value]);
                        }
                      } else if (e.target.checked === false) {
                        let arr = [...postings];
                        const index = arr.indexOf(e.target.value);
                        arr.splice(index, 1);
                        setPostings([...arr]);
                      }
                    }}
                  />
                  <label for={e} style={{ fontSize: "1.6rem" }}>
                    {" "}
                    {e}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="inqDetailsContainer">
          <p className="head" style={{ fontSize: "2rem" }}>
            Requirement Details
          </p>
          <div>
            <p>No. Of Openings :</p>
            <div
              style={{ display: "flex", justifyContent: "start", width: "50%" }}
            >
              <input
                type="number"
                style={{ width: "50%", marginRight: "1rem" }}
                placeholder="Openings"
                value={openings ? openings : data?.openings}
                onChange={(e) => {
                  setOpenings(e.target.value);
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
              >
                <p style={{ fontSize: "1.7rem" }}>Days</p>
                {daysValue?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        margin: "0.75rem 0",
                        paddingLeft: "0.15rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={e}
                        value={e}
                        style={{ width: "fit-content" }}
                        checked={
                          requirements?.days?.length > 0
                            ? requirements?.days.includes(e)
                            : data?.days?.includes(e)
                        }
                        onChange={async (e) => {
                          setRequirements({
                            ...requirements,
                            days: [...data?.days],
                          });
                          if (
                            requirements?.days.includes(e.target.value) ===
                            false
                          ) {
                            if (e.target.checked === true) {
                              setRequirements({
                                ...requirements,
                                days: [...requirements?.days, e.target.value],
                              });
                            }
                          } else if (e.target.checked === false) {
                            let arr = [...requirements?.days];
                            const index = arr.indexOf(e.target.value);
                            arr.splice(index, 1);
                            setRequirements({
                              ...requirements,
                              days: [...arr],
                            });
                          }
                        }}
                      />
                      <label
                        for={e}
                        style={{ fontSize: "1.6rem", marginLeft: "0.5rem" }}
                      >
                        {" "}
                        {e}
                      </label>
                    </div>
                  );
                })}
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
                style={{
                  width: "100%",
                  fontWeight: "500",
                  textAlign: "center",
                }}
                name="stime"
                value={requirements?.sTime ? requirements?.sTime : data?.sTime}
                className="valueSelector"
                onChange={(e) => {
                  setRequirements({ ...requirements, sTime: e.target.value });
                  var index =
                    e.target.value === "--"
                      ? times.indexOf(e.target.value)
                      : times.indexOf(e.target.value) + 2;
                  setETime(times[index]);
                }}
              >
                {times.map((time, i) => {
                  return (
                    <option value={time} key={i}>
                      {time}
                    </option>
                  );
                })}
              </select>
              <select
                style={{
                  width: "100%",
                  margin: "1rem 0",
                  fontWeight: "500",
                  textAlign: "center",
                }}
                name="etime"
                value={eTime ? eTime : data?.eTime}
                className="valueSelector"
                onChange={(e) => {
                  setETime(e.target.value);
                }}
              >
                {times.map((time, i) => {
                  return (
                    <option value={time} key={i}>
                      {time}
                    </option>
                  );
                })}
              </select>
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
              style={{ width: "85%", padding: "0 2rem" }}
            >
              <div
                className="selectMode"
                name="mode"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  width: "50%",
                }}
              >
                <p style={{ fontSize: "1.7rem" }}>Model</p>
                <input
                  type="text"
                  value={requirements?.model ? requirements.model : data?.model}
                  onChange={(e) =>
                    setRequirements({ ...requirements, model: e.target.value })
                  }
                />
              </div>
              <div
                className="selectMode"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-start",
                }}
              >
                <p style={{ fontSize: "1.7rem" }}>Type</p>
                <select
                  className="floatDataSelector"
                  style={{
                    width: "100%",
                    fontSize: "1.6rem",
                    textTransform: "capitalize",
                  }}
                  onChange={(e) =>
                    setRequirements({ ...requirements, type: e.target.value })
                  }
                  value={requirements?.type ? requirements.type : data?.type}
                >
                  <option style={{ fontSize: "1.6rem" }} value={"None"}>
                    None
                  </option>
                  <option style={{ fontSize: "1.6rem" }} value={"1 to 1"}>
                    1 to 1
                  </option>
                  <option style={{ fontSize: "1.6rem" }} value={"Group"}>
                    Group
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <p>Assignee :</p>
            <div
              style={{ display: "flex", justifyContent: "start", width: "75%" }}
            >
              <input
                type="text"
                style={{ width: "50%", marginRight: "1rem" }}
                placeholder="Assignee"
                value={
                  requirements?.assignee
                    ? requirements?.assignee
                    : data?.assignee
                }
                onChange={(e) => {
                  setRequirements({
                    ...requirements,
                    assignee: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div>
            <p>Start Date :</p>
            <div
              style={{ display: "flex", justifyContent: "start", width: "75%" }}
            >
              <input
                type="date"
                style={{ width: "50%", textAlign: "center" }}
                value={
                  requirements.startDate
                    ? requirements?.startDate.slice(0, 10)
                    : data?.startDate.slice(0, 10)
                }
                onChange={(e) => {
                  setRequirements({
                    ...requirements,
                    startDate: e.target.value,
                  });
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
              if (
                comments.length > 0 &&
                comments !== " " &&
                comments !== "  " &&
                comments !== "   "
              ) {
                axios
                  .put(`${TRAINING_BACKEND}/comment`, {
                    id: data?._id,
                    comment: comments,
                  })
                  .then((res) => {
                    if (res?.data?.modifiedCount > 0) {
                      setcomments("");
                      setTimeout(() => {
                        getRequirements();
                      }, 500);
                    }
                  });
              }
            }}
          />
        </div>
        {comment.length > 0 ? (
          <>
            {displayComment ? (
              <>
                <div
                  className="commentsDisplay"
                  onClick={() => setCmntDeleteDisplay(!cmntDeleteDisplay)}
                >
                  <h6>{comment[comment.length - 1].msg}</h6>
                  <p style={{ fontSize: "1.5rem" }}>
                    {new Date(comment[comment.length - 1].date)
                      .toString()
                      .slice(3, 21)}
                  </p>
                </div>
                {cmntDeleteDisplay ? (
                  <AiFillDelete
                    size={20}
                    style={{ paddingTop: "0.35rem", margin: "0 50%" }}
                    onClick={() =>
                      deleteComment(comment[comment.length - 1]._id)
                    }
                  />
                ) : null}
              </>
            ) : (
              comment.map(({ msg, date, _id }, i) => {
                return (
                  <>
                    <div
                      className="commentsDisplay"
                      key={i}
                      onClick={() => setCmntDeleteDisplay(!cmntDeleteDisplay)}
                    >
                      <h6>{msg}</h6>
                      <p style={{ fontSize: "1.5rem" }}>
                        {new Date(date).toString().slice(3, 21)}
                      </p>
                    </div>
                    {cmntDeleteDisplay ? (
                      <AiFillDelete
                        size={20}
                        style={{ paddingTop: "0.35rem", margin: "0 50%" }}
                        onClick={() => deleteComment(_id)}
                      />
                    ) : null}
                  </>
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
          </div>
          <div className="content">
            <div className="container1">
              <p>
                Inquiry Date :{" "}
                {new Date(data?.raiseDate).toString().slice(4, 21)}
              </p>
              <p>Due Time : </p>
            </div>
            <div className="container2">
              <p>End Time : </p>
              <p>Assignee : {data?.assignee}</p>
            </div>
          </div>
        </div>
        <button
          style={{
            backgroundColor: "red",
            padding: "0.5rem 1.75rem",
            margin: "0 10.75rem",
            border: "1px solid white",
            borderRadius: "5rem",
            outline: "none",
            fontSize: "1.5rem",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            axios
              .delete(`${TRAINING_BACKEND}/deleteRequirement`, {
                headers: {
                  Authorization: "***",
                },
                data: {
                  id: data?._id,
                },
              })
              .then((res) => {
                if (res.data.acknowledged === true) {
                  const notify = () =>
                    toast("User deleted successfully", {
                      type: "success",
                    });
                  notify();
                  setTimeout(() => {
                    getRequirements();
                  }, 1000);
                  setDetails(false);
                } else {
                  const notify = () =>
                    toast("Internal server error", {
                      type: "error",
                    });
                  notify();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Delete Lead
        </button>
      </div>
    </>
  );
};

export default FloatingUserData;
