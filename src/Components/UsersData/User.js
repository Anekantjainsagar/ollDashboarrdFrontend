import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import FloatingUserData from "./FloatingUserData";
import { ThreeDots } from "react-loader-spinner";
import { AiOutlineCopy } from "react-icons/ai";
import { BiUpArrowAlt } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { FaGripLines } from "react-icons/fa";
import { BASE_URL } from "../../Utils/index";
import ShowModal from "./ShowModal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-toastify/dist/ReactToastify.css";

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
    assignee,
    cCode,
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
  const [searchTemplate, setsearchTemplate] = useState();
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
  const [windowHeight, setwindowHeight] = useState();

  const d = new Date(inqDate).toString();

  useEffect(() => {
    const { innerHeight: heightVal } = window;
    setwindowHeight(heightVal);
  }, []);

  function openModal(e, data) {
    setIsOpen(true);
    setclickedTemplate(e);
    settemplateUser(data);
  }

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
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <div
        className="user"
        onContextMenu={() => {
          setsendToTop(!sendToTop);
        }}
        onClick={() => {
          setDetails(!details);
        }}
        style={{
          cursor: "pointer",
          gridTemplateColumns: "5% 8% 10% 9% 10% 10% 12% 12% 9% 6% 11%",
        }}
      >
        <p className="idValue">{id}</p>
        <p className="inquiryDateValue">{d.slice(4, 21)}</p>
        <p className="nameValue">{name}</p>
        <p className="phoneValue">{`${cCode ? cCode : ""}${phone}`}</p>
        <p className="classTypeValue">
          {(batchDetails?.type === "group"
            ? "Grp"
            : batchDetails?.type === "Trial"
            ? "Try"
            : batchDetails?.type === "1 to 1"
            ? "1 to 1"
            : "None") +
            " " +
            (batchDetails?.mode === "Online"
              ? "Onl."
              : batchDetails?.mode === "Offline"
              ? "Off."
              : "None")}
        </p>
        <p className="offerDetailsValue">{course}</p>
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
            ) : status === "follow" || status === "offReady" ? (
              <BiUpArrowAlt
                size={30}
                color={"rgba(255, 161, 74, 1)"}
                style={{ transform: "rotate(-45deg)" }}
              />
            ) : status === "noCourse" || status === "noBatch" ? (
              <FaGripLines size={30} color={"rgba(255, 245, 0, 1)"} />
            ) : (
              <FaGripLines size={30} color={"rgba(0, 255, 56, 1)"} />
            )}
            <p style={{ fontSize: "1.1rem" }}>
              {status === "new"
                ? "URG"
                : status === "follow" || status === "offReady"
                ? "High"
                : status === "noCourse" || status === "noBatch"
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
                  id: _id,
                  newStatus: e.target.value,
                })
                .then((response) => {
                  // console.log(response);
                  if (response.data.acknowledged === true) {
                    props.getUserData();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });

              setTimeout(() => {
                if (status !== "noBatch") {
                  if (e.target.value === "noBatch") {
                    const options = {
                      method: "POST",
                      headers: {
                        "content-type": "text/json",
                        Authorization:
                          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzIyYzViYi1kYzQwLTRmODctYjZiMi1iMjMyOTQyMjBiOGUiLCJ1bmlxdWVfbmFtZSI6ImluZm9Ab2xsLmNvIiwibmFtZWlkIjoiaW5mb0BvbGwuY28iLCJlbWFpbCI6ImluZm9Ab2xsLmNvIiwiYXV0aF90aW1lIjoiMDgvMDEvMjAyMiAwNDowMDo1NiIsImRiX25hbWUiOiIxMTUwNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.k89dQ0gkjcZ3T8VYDz6FIbr4sisaSiSTvjLZ7FhLEAc",
                      },
                      body: JSON.stringify({
                        receivers: [
                          {
                            customParams: [
                              { name: "client_name", value: name },
                              { name: "id", value: id },
                              { name: "query_date", value: d.slice(4, 16) },
                              { name: "query_time", value: d.slice(16, 21) },
                              { name: "query_status", value: e.target.value },
                            ],
                            whatsappNumber: "919993610583",
                          },
                          {
                            customParams: [
                              { name: "client_name", value: name },
                              { name: "id", value: id },
                              { name: "query_date", value: d.slice(4, 16) },
                              { name: "query_time", value: d.slice(16, 21) },
                              { name: "query_status", value: e.target.value },
                            ],
                            whatsappNumber: "917895954610",
                          },
                          {
                            customParams: [
                              { name: "client_name", value: name },
                              { name: "id", value: id },
                              { name: "query_date", value: d.slice(4, 16) },
                              { name: "query_time", value: d.slice(16, 21) },
                              { name: "query_status", value: e.target.value },
                            ],
                            whatsappNumber: "919899830458",
                          },
                          {
                            customParams: [
                              { name: "client_name", value: name },
                              { name: "id", value: id },
                              { name: "query_date", value: d.slice(4, 16) },
                              { name: "query_time", value: d.slice(16, 21) },
                              { name: "query_status", value: e.target.value },
                            ],
                            whatsappNumber: "917692045606",
                          },
                          {
                            customParams: [
                              { name: "client_name", value: name },
                              { name: "id", value: id },
                              { name: "query_date", value: d.slice(4, 16) },
                              { name: "query_time", value: d.slice(16, 21) },
                              { name: "query_status", value: e.target.value },
                            ],
                            whatsappNumber: "919699188188",
                          },
                        ],
                        template_name: "query_add_to_ops",
                        broadcast_name: "alert",
                      }),
                    };
                    fetch(
                      "https://live-server-11507.wati.io/api/v1/sendTemplateMessages",
                      options
                    )
                      .then((response) => response.json())
                      .then((response) => console.log(response))
                      .catch((err) => console.error(err));
                  }
                }
              }, 4000);
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
            <option className="noTeacher" value="noTeacher">
              !Teacher
            </option>
            <option className="started" value="started">
              Started
            </option>
            <option className="offReady" value="offReady">
              Offer Ready
            </option>
            <option className="noPay" value="noPay">
              !Pay
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
              setheight(e.clientY);
              setshowTemplate(!showTemplate);
              e.stopPropagation();
            }}
          >
            <BsWhatsapp size={21} color={"#0ac032"} />
            Template
            <div
              ref={templateRef}
              style={
                showTemplate
                  ? {
                      display: "block",
                      top:
                        height > windowHeight / 2
                          ? `${height - 225}px`
                          : `${height + 30}px`,
                    }
                  : { display: "none" }
              }
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
                            e.elementName?.toLowerCase().includes(searchTemplate)
                          ) {
                            return e;
                          }
                        } else {
                          return e;
                        }
                        return 0;
                      })
                      .map((template, i) => {
                        return (
                          <div key={i}>
                            <p
                              onClick={async () => {
                                setshowTemplate(!showTemplate);
                                openModal(template, props.data);
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
                  autoFocus={true}
                />
              </div>
            </div>
          </div>
          <CopyToClipboard
            text={`${id} ${name} ${cCode + phone} ${email} ${course}`}
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
        </p>
        <p className="sourceValue">{source}</p>
        <p className="assigneeValue">{assignee}</p>
        <p className="stageValue" onClick={(e) => e.stopPropagation()}>
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
