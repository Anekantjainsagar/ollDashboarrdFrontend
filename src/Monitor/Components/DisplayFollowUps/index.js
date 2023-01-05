import React from "react";
import Bar from "../FollowUp/Bar/index";

const DisplayFollowUps = ({ followUp, schools, id }) => {
  return (
    <div>
      {followUp
        ?.filter((follow) => {
          if (
            new Date(Date.now()).toString().slice(4, 16) ===
              new Date(follow.startDate).toString().slice(4, 16) &&
            follow?.userId.includes(id)
          ) {
            return follow;
          }
        })
        .map((follow) => {
          return <Bar follow={follow} schools={schools} />;
        })}
    </div>
  );
};

export default DisplayFollowUps;
