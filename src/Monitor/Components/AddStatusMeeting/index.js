import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styles from "./style.module.css";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import times from "../BatchDetails/times";

const AddStatusMeeting = ({ setIsOpen, modalIsOpen, user, getMeetings }) => {
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

  const { schoolName, address, phone } = user;

  const [meeting, setMeeting] = useState({
    name: schoolName,
    type: "",
    location: address,
    time: "",
    attendee: "",
    startDate: "",
    link: "",
  });

  const addMeeting = () => {
    if (meeting.name && meeting.location) {
      axios
        .post(`${MONITOR_BACKEND}/addMeeting`, { ...meeting, phone: phone })
        .then((res) => {
          if (res.data) {
            getMeetings();
            setMeeting({
              name: "",
              type: "",
              location: "",
              time: "",
              attendee: "",
              link: "",
              startDate: "",
            });
          }
          closeModal();
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
            <h1>{schoolName}</h1>
            <AiOutlineClose
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => closeModal()}
            />
          </div>
          <div className={styles.addMeet}>
            <div className={styles.header}>
              <input
                type="text"
                className={styles.name}
                placeholder="Meeting Name"
                value={meeting.name}
                onChange={(e) =>
                  setMeeting({ ...meeting, name: e.target.value })
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
                <div
                  className={styles.mode}
                  value={meeting.type}
                  onChange={(e) =>
                    setMeeting({ ...meeting, type: e.target.value })
                  }
                >
                  <p>Mode</p>
                  <div>
                    <input type="radio" name="mode" value={"Online"} />
                    <p>Online</p>
                  </div>
                  <div>
                    <input type="radio" name="mode" value={"Offline"} />
                    <p>Offline</p>
                  </div>
                </div>
                <div className={styles.sDate}>
                  <p>Start Date</p>
                  <input
                    type="date"
                    value={meeting.startDate}
                    onChange={(e) =>
                      setMeeting({ ...meeting, startDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div
                className={styles.right}
                style={{ marginTop: 0, paddingTop: 0 }}
              >
                <div className={styles.location}>
                  <p>Location</p>
                  <input
                    type="text"
                    value={meeting.location}
                    onChange={(e) =>
                      setMeeting({ ...meeting, location: e.target.value })
                    }
                  />
                </div>
                <div
                  className={styles.time}
                  style={{ display: "flex", marginTop: "0.75rem" }}
                >
                  <p style={{ margin: 0, paddingRight: "0.5rem" }}>Time : </p>
                  <select
                    name=""
                    id=""
                    value={meeting.time}
                    onChange={(e) =>
                      setMeeting({ ...meeting, time: e.target.value })
                    }
                  >
                    {times.map((time) => {
                      return <option value={time}>{time}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.notify}>
              <input
                type="text"
                style={{ marginTop: "0.75rem" }}
                value={meeting.link}
                onChange={(e) =>
                  setMeeting({ ...meeting, link: e.target.value })
                }
                placeholder="Enter the meet link"
              />
            </div>
            <button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                addMeeting();
              }}
            >
              Save Meeting
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddStatusMeeting;
