import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styles from "./style.module.css";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import times from "../BatchDetails/times";

const AddStatusfollows = ({ setIsOpen, modalIsOpen, user, getFollowUps }) => {
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

  const [follows, setFollows] = useState({
    name: user?.schoolName,
    time: "",
    startDate: "",
  });

  const addfollows = () => {
    if (follows.name && follows.time) {
      axios
        .post(`${MONITOR_BACKEND}/addFollowUP`, follows)
        .then((res) => {
          console.log(res);
          if (res.data.follow?.name.length > 0) {
            getFollowUps();
            setFollows({
              name: "",
              time: "",
              startDate: "",
            });
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
        <form encType="multipart/form-data">
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
                  <p>Start Date</p>
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
                  style={{ display: "flex", marginTop: "0.75rem" }}
                >
                  <p style={{ margin: 0, paddingRight: "0.5rem" }}>Time : </p>
                  <select
                    name=""
                    id=""
                    value={follows.time}
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