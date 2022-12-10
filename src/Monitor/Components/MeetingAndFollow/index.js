import React, { useState } from "react";
import styles from "./style.module.css";
import times from "../BatchDetails/times";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";

const MeetingAndFollow = ({ getMeetings, user, getUsers, getFollowUps }) => {
  const [meeting, setMeeting] = useState({
    name: user?.schoolName,
    type: "",
    location: "",
    time: "",
    attendee: "",
    link: "",
    startDate: "",
    comment: "",
  });
  const [meetingShow, setMeetingShow] = useState(false);

  const [followShow, setFollowShow] = useState(false);
  const [follows, setFollows] = useState({
    name: user?.schoolName,
    time: "",
    startDate: "",
    comment: "",
  });

  const addfollows = () => {
    if (follows.name && follows.time) {
      axios
        .post(`${MONITOR_BACKEND}/addFollowUP`, follows)
        .then((res) => {
          if (res.data) {
            getFollowUps();
            setFollows({
              time: "",
              startDate: "",
            });
            axios
              .put(`${MONITOR_BACKEND}/addComment`, {
                comment: `Follow Up : ${follows?.comment}`,
                id: user?._id,
              })
              .then((res) => {
                if (res) {
                  getUsers();
                  setMeeting({ comment: "" });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addMeeting = () => {
    if (meeting.name && meeting.location) {
      axios
        .post(`${MONITOR_BACKEND}/addMeeting`, meeting)
        .then((res) => {
          if (res.data) {
            getMeetings();
            setMeeting({
              type: "",
              location: "",
              time: "",
              attendee: "",
              link: "",
              startDate: "",
            });
            axios
              .put(`${MONITOR_BACKEND}/addComment`, {
                comment: `Meeting : ${meeting?.comment}`,
                id: user?._id,
              })
              .then((res) => {
                if (res) {
                  getUsers();
                  setMeeting({ comment: "" });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            marginTop: "1rem",
            backgroundColor: "#ff6d6d",
            color: "#8b0000",
          }}
          onClick={(e) => {
            e.preventDefault();
            setMeetingShow(!meetingShow);
          }}
        >
          Set Meeting
        </button>
        <button
          style={{
            marginTop: "1rem",
            backgroundColor: "#90ee90",
            color: "#00804b",
          }}
          onClick={(e) => {
            e.preventDefault();
            setFollowShow(!followShow);
          }}
        >
          Follow Up
        </button>
      </div>
      <div
        className={styles.meetingH}
        style={meetingShow ? { display: "block" } : { display: "none" }}
      >
        <input
          type="text"
          className={styles.name}
          placeholder="Meeting Name"
          value={meeting.name}
          onChange={(e) => setMeeting({ ...meeting, name: e.target.value })}
        />
        <div className={styles.container}>
          <div className={styles.left}>
            <div
              className={styles.mode}
              value={meeting.type}
              onChange={(e) => setMeeting({ ...meeting, type: e.target.value })}
            >
              <p>Mode</p>
              <div>
                <input
                  type="radio"
                  style={{ width: "fit-content" }}
                  name="mode"
                  value={"Online"}
                />
                <p>Online</p>
              </div>
              <div>
                <input
                  type="radio"
                  style={{ width: "fit-content" }}
                  name="mode"
                  value={"Offline"}
                />
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
            <div className={styles.time} style={{ marginTop: "0.75rem" }}>
              <p style={{ margin: 0, padding: "0.5rem 0" }}>Time </p>
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
        <input
          type="text"
          placeholder="Add a comment..."
          value={meeting?.comment}
          onChange={(e) => setMeeting({ ...meeting, comment: e.target.value })}
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
      <div
        className={styles.followUPH}
        style={followShow ? { display: "block" } : { display: "none" }}
      >
        <input
          type="text"
          className={styles.name}
          placeholder="School Name"
          value={follows.name}
          onChange={(e) => setFollows({ ...follows, name: e.target.value })}
        />
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
          <div className={styles.right} style={{ marginTop: 0, paddingTop: 0 }}>
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
        <input
          type="text"
          placeholder="Add a comment..."
          value={follows.comment}
          onChange={(e) => setFollows({ ...follows, comment: e.target.value })}
        />
        <button
          className={styles.btn}
          onClick={(e) => {
            e.preventDefault();
            addfollows();
          }}
        >
          Add Follow Up
        </button>
      </div>
    </div>
  );
};

export default MeetingAndFollow;