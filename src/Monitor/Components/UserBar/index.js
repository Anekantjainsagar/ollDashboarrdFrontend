import React, { useState } from "react";
import MONITOR_BACKEND from "../../Utils";
import axios from "axios";
import "./styles.css";
import styles from "./style.module.css";
import AddStatusMeeting from "../AddStatusMeeting";
import AddStatusFollowUp from "../AddStatusFollowUp/index";
import FloatingUserData from "../../Screens/FloatingUserData";
import { AiOutlineRight } from "react-icons/ai";

const UserBar = ({
  user,
  getUsers,
  getMeetings,
  getFollowUps,
  getPrograms,
  programs,
  schools,
}) => {
  const [statusChange, setStatus] = useState("");
  const [showUserData, setShowUserData] = useState(false);
  const [comments, setComments] = useState("");
  const [stages, setStage] = useState("hot");
  const {
    schoolName,
    id,
    handler,
    status,
    offer,
    inqDate,
    _id,
    source,
    getOffers,
    stage,
  } = user;

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  const [followUpModal, setFollowUpModal] = useState(false);
  function openFollowModal() {
    setFollowUpModal(true);
  }

  return (
    <>
      <AddStatusMeeting
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        user={user}
        getMeetings={getMeetings}
      />
      <AddStatusFollowUp
        modalIsOpen={followUpModal}
        openModal={openFollowModal}
        setIsOpen={setFollowUpModal}
        user={user}
        getFollowUps={getFollowUps}
      />
      <div
        className={styles.bar}
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (showUserData === false) {
            setShowUserData(!showUserData);
          }
        }}
      >
        <p className={styles.id}>{id}</p>
        <p className={styles.inqDate}>
          {new Date(inqDate).toString().slice(4, 21)}
        </p>
        <p className={styles.name}>{schoolName}</p>
        <p className={styles.type} onClick={(e) => e.stopPropagation()}>
          <select
            name=""
            id=""
            value={stage ? stage : stages}
            className={stage ? stage : stages}
            style={{ width: "90%" }}
            onChange={(e) => {
              setStage(e.target.value);
              axios
                .put(`${MONITOR_BACKEND}/setStage`, {
                  id: _id,
                  stage: e.target.value,
                })
                .then((response) => {
                  if (response.data) {
                    getUsers();
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
        <p className={styles.phone}>{source}</p>
        <p className={styles.offerDetails}>{offer}</p>
        <FloatingUserData
          showUserData={showUserData}
          setShowUserData={setShowUserData}
          user={user}
          getUsers={getUsers}
          getFollowUps={getFollowUps}
          getMeetings={getMeetings}
          programs={programs}
          getOffers={getOffers}
          getPrograms={getPrograms}
          schools={schools}
        />
        <p className={styles.status} onClick={(e) => e.stopPropagation()}>
          <select
            value={statusChange.length > 0 ? statusChange : status}
            onChange={(e) => {
              axios
                .put(`${MONITOR_BACKEND}/setStatus`, {
                  id: _id,
                  status: e.target.value,
                })
                .then((response) => {
                  console.log(response);
                  if (response.data) {
                    getUsers();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              // if (e.target.value === "MeetingSet") {
              //   openModal();
              // }
              if (e.target.value === "FollowUp") {
                openFollowModal();
              }
            }}
            className={statusChange.length > 0 ? statusChange : status}
          >
            <option
              className={styles.New}
              value="New"
              disabled={status === "FollowUp" || status === "Started"}
            >
              New
            </option>
            <option
              className={styles.FollowUp}
              value="FollowUp"
              disabled={status === "Started"}
            >
              Follow Up
            </option>
            <option className={styles.Started} value="Started">
              Started
            </option>
          </select>
        </p>
        <p className={styles.cmnt} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={comments}
              placeholder="Add a comment"
              onChange={(e) => setComments(e.target.value)}
            />
            <AiOutlineRight
              size={25}
              className={styles.icon}
              onClick={() => {
                if (
                  comments.length > 0 &&
                  comments !== " " &&
                  comments !== "  " &&
                  comments !== "   "
                ) {
                  axios
                    .put(`${MONITOR_BACKEND}/addComment`, {
                      comment: comments,
                      id: _id,
                    })
                    .then((res) => {
                      if (res) {
                        getUsers();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setComments("");
                }
              }}
            />
          </div>
        </p>
        <p className={styles.handler}>{handler}</p>
      </div>
    </>
  );
};

export default UserBar;