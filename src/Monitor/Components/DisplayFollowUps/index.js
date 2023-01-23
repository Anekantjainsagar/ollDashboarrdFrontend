import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import styles from "./style.module.css";

const DisplayFollowUps = ({ followUp, user, schools }) => {
  const [userFollowUps, setUserFollowUps] = useState([]);
  useEffect(() => {
    const follows = followUp.filter((follow) => {
      return follow.userId === user._id;
    });
    setUserFollowUps(follows);
  }, []);

  return (
    <div>
      {userFollowUps.map((follow, i) => {
        return <Bar follow={follow} schools={schools} key={i} />;
      })}
    </div>
  );
};

export default DisplayFollowUps;
