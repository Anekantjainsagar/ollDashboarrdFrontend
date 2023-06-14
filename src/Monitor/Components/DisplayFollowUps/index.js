import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import styles from "./style.module.css";

const DisplayFollowUps = ({ followUp, user, schools, meetings }) => {
  const [userFollowUps, setUserFollowUps] = useState([]);
  useEffect(() => {
    const follows = followUp.filter((follow) => {
      return follow.userId === user._id;
    });
    setUserFollowUps(follows);
  }, [user, schools]);

  const [userMeetings, setUserMeetings] = useState([]);
  useEffect(() => {
    const meeting = meetings.filter((follow) => {
      return follow.name.toLowerCase().includes(user.schoolName.toLowerCase());
    });
    setUserMeetings(meeting);
  }, [user, schools]);

  return (
    <>
      {userFollowUps.filter((e) => {
        return new Date(e.startDate) > new Date(Date.now());
      }).length > 0 ? (
        <div
          style={{
            margin: "1rem 0",
          }}
        >
          <h1 style={{ fontSize: "1.75rem", textAlign: "center" }}>
            Upcoming FollowUps
          </h1>
          {userFollowUps
            .filter((e) => {
              return new Date(e.startDate) > new Date(Date.now());
            })
            .map((follow, i) => {
              return <Bar follow={follow} schools={schools} key={i} />;
            })}
        </div>
      ) : null}
      <div
        style={{
          margin: "1rem 0",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", textAlign: "center" }}>FollowUps</h1>
        {userFollowUps
          .filter((e) => {
            return new Date(e.startDate) <= new Date(Date.now());
          })
          .map((follow, i) => {
            return <Bar follow={follow} schools={schools} key={i} />;
          })}
      </div>
      <div
        style={{
          margin: "1rem 0",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", textAlign: "center" }}>Meetings</h1>
        {userMeetings.map((follow, i) => {
          return <Bar follow={follow} schools={schools} key={i} />;
        })}
      </div>
    </>
  );
};

export default DisplayFollowUps;
