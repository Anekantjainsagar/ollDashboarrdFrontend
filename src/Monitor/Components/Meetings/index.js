import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import Bar from "./Bar/index";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import times from "../BatchDetails/times";

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

const Meetings = ({ meetings, getMeetings }) => {
  const meetRef = useRef();
  const [showAddMeet, setShowAddMeet] = useState(false);
  useOutsideAlerter(meetRef, showAddMeet, setShowAddMeet);
  const { innerWidth: width } = window;
  const [meetLocation, setMeetLocation] = useState({
    x: "",
    y: "",
  });
  const [meeting, setMeeting] = useState({
    name: "",
    type: "",
    location: "",
    time: "",
    attendee: "",
    link: "",
    startDate: "",
  });

  const addMeeting = () => {
    if (meeting.name && meeting.location) {
      axios
        .post(`${MONITOR_BACKEND}/addMeeting`, meeting)
        .then((res) => {
          console.log(res);
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
          setShowAddMeet(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.meetings}>
      <div className={styles.header}>
        <h1>Meetings</h1>
        <AiOutlinePlus
          className={styles.plus}
          size={27}
          onClick={(e) => {
            setMeetLocation({ x: e.clientX, y: e.clientY });
            setShowAddMeet(!showAddMeet);
          }}
        />
      </div>
      <div
        className={styles.addMeet}
        ref={meetRef}
        style={
          showAddMeet === true
            ? {
                display: "block",
                top: `${meetLocation.y - 50}px`,
                right: `${width - meetLocation.x + 25}px`,
              }
            : { display: "none" }
        }
      >
        <div className={styles.header}>
          <input
            type="text"
            className={styles.name}
            placeholder="Meeting Name"
            value={meeting.name}
            onChange={(e) => setMeeting({ ...meeting, name: e.target.value })}
          />
          <AiOutlineClose
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setShowAddMeet(false)}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            <div
              className={styles.mode}
              value={meeting.type}
              onChange={(e) => setMeeting({ ...meeting, type: e.target.value })}
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
          <div className={styles.right} style={{ marginTop: 0, paddingTop: 0 }}>
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
            <div className={styles.attendee}>
              <p>Attendee</p>
              <input
                type="text"
                value={meeting.attendee}
                onChange={(e) =>
                  setMeeting({ ...meeting, attendee: e.target.value })
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
            placeholder="Enter the meet link"
            value={meeting.link}
            onChange={(e) => setMeeting({ ...meeting, link: e.target.value })}
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
      <div className={styles.data}>
        {meetings
          .filter((meet) => {
            if (
              new Date(Date.now()).toString().slice(4, 16) ===
              new Date(meet.startDate).toString().slice(4, 16)
            ) {
              return meet;
            }
          })
          .map((meet) => {
            return <Bar meet={meet} />;
          })}
      </div>
    </div>
  );
};

export default Meetings;