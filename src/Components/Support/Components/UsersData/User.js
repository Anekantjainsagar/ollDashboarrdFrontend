import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCopy } from "react-icons/ai";
import { BiUpArrowAlt } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import FloatingUserData from "./FloatingUserData";
import { BASE_URL } from "../../../../Utils/index";
import ShowModal from "./ShowModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
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

const User = (props) => {
  const {
    name,
    phone,
    course,
    batchDetails,
    source,
    _id,
    id,
    status,
    inqDate,
    email,
    assignee,
    oprationalStage,
  } = props.data;

  const stageRef = useRef(null);
  const templateRef = useRef(null);
  const topRef = useRef(null);
  const commentRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const [showTemplate, setshowTemplate] = useState(false);
  const [comment, setcomment] = useState();
  const [clickedTemplate, setclickedTemplate] = useState();
  const [templateUser, settemplateUser] = useState();
  const [sendToTop, setsendToTop] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [type, setType] = useState("new");
  useOutsideAlerter(templateRef, showTemplate, setshowTemplate);
  useOutsideAlerter(commentRef, showComments, setshowComments);
  useOutsideAlerter(commentRef, showComments, setshowComments);
  useOutsideAlerter(topRef, sendToTop, setsendToTop);
  const [height, setheight] = useState();

  const d = new Date(inqDate).toString();

  function openModal(e, data) {
    setIsOpen(true);
    setclickedTemplate(e);
    settemplateUser(data);
  }

  const handleKeyPress = (e) => {
    if (
      comment.length > 0 &&
      comment !== " " &&
      comment !== "  " &&
      comment !== "   "
    ) {
      if (e.key === "Enter") {
        axios.put(`${BASE_URL}/comment`, {
          id: _id,
          comment: comment,
          user: props.sales?.name,
        });
        setcomment("");
        setTimeout(() => {
          props.getUserData();
        }, 500);
      }
    }
  };

  const sendToTopFunction = (e) => {
    var data = e;
    setloading(true);
    axios
      .delete(`${BASE_URL}/deleteUser`, {
        headers: {
          Authorization: "***",
        },
        data: {
          _id: data._id,
        },
      })
      .then((res) => {
        if (res.data.acknowledged === true) {
          axios
            .post(`${BASE_URL}/addUser`, data)
            .then((res) => {
              const notify = () =>
                toast(
                  res.data.Success
                    ? "Sended to top successfully"
                    : "Internal server error",
                  {
                    type: res.data.Success ? "success" : "error",
                  }
                );
              if (res.data.Success === true) {
                props.getUserData();
                notify();
                setsendToTop(false);
                setloading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setloading(false);
            });
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
        setloading(false);
      });
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
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <div
        className="userOfOperation"
        onContextMenu={() => {
          setsendToTop(!sendToTop);
        }}
        onClick={() => {
          setDetails(!details);
        }}
        style={{ cursor: "pointer" }}
      >
        <p className="idValue">{id}</p>
        <p className="raiseDateValue">{d.slice(4, 21)}</p>
        <p className="typeValue">
          <p
            style={{
              fontSize: "1.5rem",
              padding: "0.5rem 0.3rem",
              width: "95%",
              margin: "auto",
              fontWeight: 700,
              borderRadius: "0.5rem",
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
        </p>
        <p className="issueDetailValue">
          {course}
          <br />
          {(batchDetails?.type === "group"
            ? "Grp"
            : batchDetails?.type === "Trial"
            ? "Try"
            : "1-1") +
            " " +
            (batchDetails?.mode === "Online" ? "Onl." : "Off.")}
        </p>
        <div
          className="priorityValue"
          style={{
            marginRight: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {status === "noTeacher" ? (
            <BiUpArrowAlt size={30} color={"rgba(242, 115, 115, 1)"} />
          ) : status === "noCourse" ? (
            <BiUpArrowAlt
              size={30}
              color={"rgba(255, 161, 74, 1)"}
              style={{ transform: "rotate(-45deg)" }}
            />
          ) : (
            <FaGripLines size={30} color={"rgba(255, 245, 0, 1)"} />
          )}
          <p style={{ fontSize: "1.1rem" }}>
            {status === "noTeacher"
              ? "URG"
              : status === "noCourse"
              ? "High"
              : "Med."}
          </p>
        </div>
        <p
          className="stageOperationsValue"
          onClick={(e) => e.stopPropagation()}
        >
          <select
            style={{ width: "73%" }}
            ref={stageRef}
            value={oprationalStage ? oprationalStage : type}
            className={
              stageRef?.current?.value === undefined
                ? oprationalStage
                : stageRef?.current?.value
            }
            onChange={async (e) => {
              e.stopPropagation();
              setType(e.target.value);
              if (
                e.target.value === "noTeacher" ||
                e.target.value === "noBatch"
              ) {
                await axios
                  .put(`${BASE_URL}/setStatus`, {
                    id: _id,
                    newStatus: e.target.value,
                  })
                  .then((response) => {
                    console.log(response);
                    if (response.data.acknowledged === true) {
                      props.getUserData();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              if (e.target.value !== "new") {
                axios.put(`${BASE_URL}/comment`, {
                  id: _id,
                  comment: `New status for ${name} is ${e.target.value}`,
                  user: props.sales?.name,
                });
              }
              await axios
                .put(`${BASE_URL}/setOprationalStage`, {
                  id: _id,
                  newStage: e.target.value,
                })
                .then((response) => {
                  if (response.data.acknowledged === true) {
                    props.getUserData();
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
        </p>
        <FloatingUserData
          data={props.data}
          details={details}
          setDetails={setDetails}
          getUserData={props.getUserData}
          templateMsg={props.templateMsg}
          sales={props.sales}
          setdata={props.setdata}
          usersData={props.usersData}
        />
        <p className="actionsOperationValue">
          <CopyToClipboard
            text={`${id} ${d.slice(4, 21)} ${oprationalStage} ${
              course + (batchDetails?.mode + batchDetails?.type)
            }`}
            onCopy={() => {
              const notify = () => {
                toast("Copied successfully", { type: "success" });
              };
              notify();
            }}
          >
            <div
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <AiOutlineCopy
                size={20}
                style={{ paddingRight: "0.1rem" }}
                color={"white"}
              />
              Copy
            </div>
          </CopyToClipboard>
          <div
            className="btn"
            onClick={(e) => {
              setheight(e.clientY);
              setshowComments(!showComments);
              e.stopPropagation();
            }}
          >
            Comment
            <div
              ref={commentRef}
              style={
                showComments
                  ? { display: "block", top: `${height + 32}px`, left: "64%" }
                  : { display: "none" }
              }
              className="commentBox"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  placeholder="Comment.."
                  autoFocus={true}
                  onKeyPress={handleKeyPress}
                />
                <AiOutlineRight
                  size={19}
                  className="icon"
                  onClick={() => {
                    if (
                      comment.length > 0 &&
                      comment !== " " &&
                      comment !== "  " &&
                      comment !== "   "
                    ) {
                      axios.put(`${BASE_URL}/comment`, {
                        id: _id,
                        comment: comment,
                        user: props.sales?.name,
                      });
                      setTimeout(() => {
                        props.getUserData();
                      }, 1000);
                      setcomment("");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </p>
        <p className="sourceOperationValue">
          {assignee ? assignee : "Samantha"}
        </p>
        <p className="resolveDateValue">{d.slice(4, 21)}</p>
      </div>
      <div
        ref={topRef}
        className="sendToTop"
        style={
          sendToTop
            ? { display: "block", border: "1px solid white" }
            : { display: "none" }
        }
        onClick={() => sendToTopFunction(props.data)}
      >
        {loading ? (
          <ThreeDots
            style={{ display: "block" }}
            color="#fff"
            height={40}
            width={40}
          />
        ) : (
          "Send to Top"
        )}
      </div>
    </>
  );
};

export default User;
