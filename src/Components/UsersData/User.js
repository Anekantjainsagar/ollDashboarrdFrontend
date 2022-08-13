import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BsWhatsapp } from "react-icons/bs";
import { BiUpArrowAlt } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import FloatingUserData from "./FloatingUserData";
import { BASE_URL } from "../../Utils/index";
import ShowModal from "./ShowModal";

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
    cCode
  } = props.data;

  const stageRef = useRef(null);
  const statusRef = useRef(null);
  const templateRef = useRef(null);
  const commentRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const [showTemplate, setshowTemplate] = useState(false);
  const [comment, setcomment] = useState();
  const [stageValue, setstage] = useState("🥶 cold");
  useOutsideAlerter(templateRef, showTemplate, setshowTemplate);
  useOutsideAlerter(commentRef, showComments, setshowComments);
  const [statusValue, setstatusValue] = useState();
  const [searchTemplate, setsearchTemplate] = useState();
  const [clickedTemplate, setclickedTemplate] = useState()
  const [templateUser, settemplateUser] = useState()

  const showTempltext = () => {
    if (details === false) {
      setDetails(true);
    }
  };
  const d = new Date(inqDate).toString();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(e,data) {
    setIsOpen(true);
    setclickedTemplate(e)
    settemplateUser(data)
  }

  return (
    <>
      <ShowModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        clickedTemplate={clickedTemplate}
        templateUser={templateUser}
      />
      <div
        className="user"
        onClick={showTempltext}
        style={{ cursor: "pointer" }}
      >
        <p className="idValue">{id}</p>
        <p className="inquiryDateValue">{d.slice(4, 21)}</p>
        <p className="nameValue">{name}</p>
        <p className="phoneValue">{((cCode===undefined)?"":cCode)+phone}</p>
        <p className="classTypeValue">
          {batchDetails
            ? batchDetails.type.slice(0, 3) +
              "." +
              " " +
              batchDetails.mode.slice(0, 3) +
              "."
            : null}
        </p>
        <p className="offerDetailsValue">{course}</p>
        <FloatingUserData
          data={props.data}
          details={details}
          setDetails={setDetails}
          getUserData={props.getUserData}
          templateMsg={props.templateMsg}
        />
        <p className="statusValue" style={{ display: "flex" }}>
          <div
            style={{
              marginRight: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {status === "new" ? (
              <BiUpArrowAlt size={30} color={"rgba(242, 115, 115, 1)"} />
            ) : status === "follow" ? (
              <BiUpArrowAlt
                size={30}
                color={"rgba(255, 161, 74, 1)"}
                style={{ transform: "rotate(-45deg)" }}
              />
            ) : status === "noCourse" ? (
              <FaGripLines size={30} color={"rgba(255, 245, 0, 1)"} />
            ) : (
              <FaGripLines size={30} color={"rgba(0, 255, 56, 1)"} />
            )}
            <p style={{ fontSize: "1.1rem" }}>
              {status === "new"
                ? "URG"
                : status === "follow"
                ? "High"
                : status === "noCourse"
                ? "Med."
                : "Low"}
            </p>
          </div>
          <select
            onClick={(e) => e.stopPropagation()}
            ref={statusRef}
            className={status ? status : statusValue}
            value={status ? status : statusValue}
            onChange={async (e) => {
              setstatusValue(e.target.value);
              await axios
                .put(`${BASE_URL}/setStatus`, {
                  id: id,
                  newStatus: e.target.value,
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => {
                  console.log(err);
                });
              setTimeout(() => {
                props.getUserData();
              }, 100);
            }}
          >
            <option className="new" value="new">
              New
            </option>
            <option className="follow" value="follow">
              Fol. Up
            </option>
            <option className="noCourse" value="noCourse">
              !Course
            </option>
            <option className="started" value="started">
              Started
            </option>
            <option className="noBatch" value="noBatch">
              !Batch
            </option>
          </select>
        </p>
        <p className="actionsValue">
          <div
            className="btn"
            onClick={(e) => {
              setshowTemplate(!showTemplate);
              e.stopPropagation();
            }}
          >
            <BsWhatsapp size={21} color={"#0ac032"} />
            Template
          </div>
          <div
            ref={templateRef}
            style={showTemplate ? { display: "block" } : { display: "none" }}
            className="templateBox"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="heading">Select a Template</p>
            <div className="content">
              {props.templateMsg
                ? props.templateMsg
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
                      return (
                        <div>
                          <p
                            onClick={async () => {
                              setshowTemplate(!showTemplate)
                              openModal(template,props.data);
                            }}
                          >
                            {template.elementName}
                          </p>
                          <div className="line"></div>
                        </div>
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
            onClick={(e) => {
              setshowComments(!showComments);
              e.stopPropagation();
            }}
          >
            Comment
          </div>
          <div
            ref={commentRef}
            style={showComments ? { display: "block" } : { display: "none" }}
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
        </p>
        <p className="sourceValue">{source}</p>
        <p className="stageValue" onClick={(e) => e.stopPropagation()}>
          <select
            style={{ width: "75%" }}
            ref={stageRef}
            value={stage ? stage : stageValue}
            className={stage ? stage : stageValue}
            onChange={async (e) => {
              e.stopPropagation();
              setstage(e.target.value);
              await axios
                .put(`${BASE_URL}/setStage`, {
                  id: id,
                  newStage: e.target.value,
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => {
                  console.log(err);
                });
              setTimeout(() => {
                props.getUserData();
              }, 100);
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
      </div>
    </>
  );
};

export default User;
