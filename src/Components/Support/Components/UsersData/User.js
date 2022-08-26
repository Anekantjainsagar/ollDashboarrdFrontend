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
    stage,
    inqDate,
    email,
    school,
  } = props.data;

  const stageRef = useRef(null);
  const statusRef = useRef(null);
  const templateRef = useRef(null);
  const topRef = useRef(null);
  const commentRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const [showTemplate, setshowTemplate] = useState(false);
  const [comment, setcomment] = useState();
  const [stageValue, setstage] = useState();
  const [statusValue, setstatusValue] = useState();
  const [clickedTemplate, setclickedTemplate] = useState();
  const [templateUser, settemplateUser] = useState();
  const [sendToTop, setsendToTop] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
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
    if (comment.length > 0) {
      if (e.key === "Enter") {
        axios.put(`${BASE_URL}/comment`, {
          id: _id,
          comment: comment,
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
          id: data._id,
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
          autoClose={1000}
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
            value={stage ? stage : stageValue}
            className={stage ? stage : stageValue}
            onChange={async (e) => {
              e.stopPropagation();
              setstage(e.target.value);
              await axios
                .put(`${BASE_URL}/setStage`, {
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
        </p>
        <FloatingUserData
          data={props.data}
          details={details}
          setDetails={setDetails}
          getUserData={props.getUserData}
          templateMsg={props.templateMsg}
          setdata={props.setdata}
          usersData={props.usersData}
        />
        <p className="actionsOperationValue">
          <CopyToClipboard
            text={`${name} ${phone} ${email} ${school} ${source} ${d.slice(
              4,
              21
            )}`}
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
                    axios.put(`${BASE_URL}/comment`, {
                      id: _id,
                      comment: comment,
                    });
                    setTimeout(() => {
                      props.getUserData();
                    }, 1000);
                    setcomment("");
                  }}
                />
              </div>
            </div>
          </div>
        </p>
        <p className="sourceOperationValue">{source}</p>
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
