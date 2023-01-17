import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import times from "../BatchDetails/times";

const AddStatusfollows = ({
  setIsOpen,
  modalIsOpen,
  user,
  getFollowUps,
  getUsers,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      padding: "1rem 2rem",
      borderRadius: "1rem",
      backgroundColor: "#000",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  const [comment, setComment] = useState();
  const [follows, setFollows] = useState({
    name: user?.schoolName,
    time: "",
    startDate: "",
    mode: "Online",
  });

  const addfollows = () => {
    if (follows.name && follows.time) {
      axios
        .post(`${MONITOR_BACKEND}/addFollowUP`, {
          ...follows,
          id: user?.schoolId,
          userId: user?._id,
        })
        .then((res) => {
          if (res.data) {
            getFollowUps();
            setFollows({
              time: "",
              startDate: "",
            });
            axios
              .put(`${MONITOR_BACKEND}/addComment`, {
                comment: `Follow Up : ${comment}`,
                id: user?._id,
              })
              .then((res) => {
                if (res) {
                  getUsers();
                  setComment("");
                }
              })
              .catch((err) => {
                console.log(err);
              });
            getFollowUps();
            closeModal();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        id="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          encType="multipart/form-data"
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={styles.header}>
            <h1>{user?.schoolName}</h1>
            <AiOutlineClose
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => closeModal()}
            />
          </div>
          <div className={styles.addMeet}>
            <div className={styles.header} style={{ marginBottom: "0.65rem" }}>
              <input
                type="text"
                className={styles.name}
                placeholder="School Name"
                value={follows.name}
                onChange={(e) =>
                  setFollows({ ...follows, name: e.target.value })
                }
              />
              <AiOutlineClose
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => closeModal()}
              />
            </div>
            <div className={styles.container}>
              <div className={styles.left}>
                <div className={styles.sDate}>
                  <p>Next FollowUp</p>
                  <input
                    type="date"
                    value={follows.startDate}
                    style={{ color: "white" }}
                    onChange={(e) =>
                      setFollows({ ...follows, startDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div
                className={styles.right}
                style={{ marginTop: 0, paddingTop: 0 }}
              >
                <div
                  className={styles.time}
                  style={{
                    display: "flex",
                    marginTop: "0.75rem",
                  }}
                >
                  <p style={{ margin: 0, paddingRight: "0.4rem" }}>Time : </p>
                  <select
                    name=""
                    id=""
                    value={follows.time}
                    style={{ width: "60%" }}
                    onChange={(e) =>
                      setFollows({ ...follows, time: e.target.value })
                    }
                  >
                    {times.map((time) => {
                      return <option value={time}>{time}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.15rem 0.75rem",
              }}
            >
              <p>Mode :- </p>
              <select
                style={{ width: "80%" }}
                value={follows?.mode}
                onChange={(e) => {
                  setFollows({ ...follows, mode: e.target.value });
                }}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                addfollows();
              }}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddStatusfollows;
