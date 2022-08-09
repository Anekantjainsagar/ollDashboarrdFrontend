import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BsWhatsapp } from "react-icons/bs";
import { BiUpArrowAlt } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import FloatingUserData from "./FloatingUserData";
import { BASE_URL } from "../../Utils/index";

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
    email,
    age,
    school,
    course,
    batchDetails,
    source,
    _id,
    id,
    commentValues,
    status,
    stage,
    inqDate,
  } = props.data;

  const stageRef = useRef(null);
  const statusRef = useRef(null);
  const templateRef = useRef(null);
  const commentRef = useRef(null);

  const [iconType, setIconType] = useState(0);
  const [details, setDetails] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const [showTemplate, setshowTemplate] = useState(false);
  const [comment, setcomment] = useState();

  useOutsideAlerter(templateRef, showTemplate, setshowTemplate);
  useOutsideAlerter(commentRef, showComments, setshowComments);

  const showTempltext = () => {
    if (details === false) {
      setDetails(true);
    }
  };

  return (
    <>
      <div
        className="user"
        onClick={showTempltext}
        style={{ cursor: "pointer" }}
      >
        <p className="idValue">{id}</p>
        <p className="inquiryDateValue">{inqDate.slice(4, 15)}</p>
        <p className="nameValue">{name}</p>
        <p className="phoneValue">{phone}</p>
        <p className="classTypeValue">
          {batchDetails ? batchDetails.type + " " + batchDetails.mode : null}
        </p>
        <p className="offerDetailsValue">{course}</p>
        <FloatingUserData
          data={props.data}
          details={details}
          setDetails={setDetails}
          getUserData={props.getUserData}
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
            {iconType === 0 ? (
              <BiUpArrowAlt size={30} color={"rgba(242, 115, 115, 1)"} />
            ) : iconType === 1 ? (
              <BiUpArrowAlt
                size={30}
                color={"rgba(255, 161, 74, 1)"}
                style={{ transform: "rotate(-45deg)" }}
              />
            ) : iconType === 2 ? (
              <FaGripLines size={30} color={"rgba(255, 245, 0, 1)"} />
            ) : (
              <FaGripLines size={30} color={"rgba(0, 255, 56, 1)"} />
            )}
            <p style={{ fontSize: "1.1rem" }}>
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
            onClick={(e) => e.stopPropagation()}
            id=""
            ref={statusRef}
            className="new"
            onChange={() => {
              statusRef.current.className =
                statusRef.current.options[
                  statusRef.current.options.selectedIndex
                ].className;
              setIconType(statusRef.current.options.selectedIndex);
            }}
          >
            <option className="new" value="new">
              New
            </option>
            <option className="follow" value="follow">
              Follow Up
            </option>
            <option className="noCourse" value="noCourse">
              ! No Course
            </option>
            <option className="started" value="started">
              Started
            </option>
            <option className="noBatch" value="noBatch">
              ! No Batch
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
            <BsWhatsapp size={25} color={"#0ac032"} />
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
              <p>Call Shreyaan dag...</p>
              <div className="line"></div>
              <p>Call Shreyaan dag...</p>
              <div className="line"></div>
              <p>Call Shreyaan dag...</p>
              <div className="line"></div>
              <p>Call Shreyaan dag...</p>
              <div className="line"></div>
              <p>Call Shreyaan dag...</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input type="text" placeholder="Comment.." />
              <AiOutlineRight size={19} className="icon" />
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
                  setcomment("");
                  props.getUserData();
                }}
              />
            </div>
          </div>
        </p>
        <p className="sourceValue">{source}</p>
        <p className="stageValue" onClick={(e) => e.stopPropagation()}>
          <select
            style={{ width: "80%" }}
            name=""
            ref={stageRef}
            id=""
            onChange={(e) => {
              stageRef.current.className =
                stageRef.current.options[
                  stageRef.current.options.selectedIndex
                ].className;
              e.stopPropagation();
            }}
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
        </p>
      </div>
    </>
  );
};

export default User;
