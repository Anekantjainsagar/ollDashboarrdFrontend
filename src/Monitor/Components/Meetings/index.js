import React, { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import Bar from "./Bar/index";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import times from "../BatchDetails/times";
import { CSVLink } from "react-csv";

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
  const [showingFollowUp, setShowingFollowUp] = useState("Today");
  const [tommorow, setTommorow] = useState();
  useOutsideAlerter(meetRef, showAddMeet, setShowAddMeet);
  const { innerWidth: width } = window;
  const [meetLocation, setMeetLocation] = useState({
    x: "",
    y: "",
  });
  const [comment, setComment] = useState();
  const [meeting, setMeeting] = useState({
    name: "",
    type: "",
    location: "",
    time: "",
    attendee: "",
    link: "",
    startDate: "",
  });

  useEffect(() => {
    let tommorow;
    var today = new Date();
    tommorow = new Date(today);
    tommorow.setDate(today.getDate() + 1);
    setTommorow(tommorow);
  }, [meetings]);

  const addMeeting = () => {
    if (meeting.name && meeting.location) {
      axios
        .post(`${MONITOR_BACKEND}/addMeeting`, { ...meeting, comment })
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
        <select
          onChange={(e) => setShowingFollowUp(e.target.value)}
          value={showingFollowUp}
        >
          <option value="Today">Today</option>
          <option value="Tommorow">Tommorow</option>
          <option value="Upcoming">Upcoming</option>
        </select>
        {meetings?.length > 0 ? (
          <CSVLink
            data={meetings?.filter((follow) => {
              if (showingFollowUp === "Today") {
                return (
                  new Date(Date.now()).toString().slice(4, 16) ===
                  new Date(follow.startDate).toString().slice(4, 16)
                );
              } else if (showingFollowUp === "Tommorow") {
                return (
                  tommorow.toString().slice(4, 16) ===
                  new Date(follow.startDate).toString().slice(4, 16)
                );
              } else {
                return new Date(follow.startDate) > new Date(Date.now());
              }
            })}
            filename="Meetings"
            className={styles.btn}
          >
            Export
          </CSVLink>
        ) : null}
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
                {times.map((time, i) => {
                  return (
                    <option value={time} key={i}>
                      {time}
                    </option>
                  );
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
            addMeeting();
          }}
        >
          Save Meeting
        </button>
      </div>
      <div className={styles.data}>
        {meetings
          ?.filter((follow) => {
            if (showingFollowUp === "Today") {
              return (
                new Date(Date.now()).toString().slice(4, 16) ===
                new Date(follow.startDate).toString().slice(4, 16)
              );
            } else if (showingFollowUp === "Tommorow") {
              return (
                tommorow.toString().slice(4, 16) ===
                new Date(follow.startDate).toString().slice(4, 16)
              );
            } else {
              return new Date(follow.startDate) > new Date(Date.now());
            }
          })
          .map((meet, i) => {
            return <Bar meet={meet} key={i} />;
          })}
      </div>
    </div>
  );
};

export default Meetings;
