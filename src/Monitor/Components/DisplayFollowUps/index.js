import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import styles from "./style.module.css";

const DisplayFollowUps = ({ followUp, user, schools }) => {
  const [userFollowUps, setUserFollowUps] = useState([]);
  useEffect(() => {
    const follows = followUp.filter((follow) => {
      return follow.userId === user._id;
    });
    console.log(follows);
    setUserFollowUps(follows);
  }, []);

  return (
    <div>
      {userFollowUps.map((follow) => {
        return <Bar follow={follow} schools={schools} />;
      })}
    </div>
  );
};

export default DisplayFollowUps;
