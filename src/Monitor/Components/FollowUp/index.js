import React, { useState } from "react";
import styles from "./style.module.css";
import Bar from "./Bar/index";
import AddStatusfollows from "../AddStatusFollowUp";

const FollowUp = ({ followUp, getFollowUps }) => {
  const [followUpModal, setFollowUpModal] = useState(false);
  function openFollowModal() {
    setFollowUpModal(true);
  }

  return (
    <>
      <AddStatusfollows
        modalIsOpen={followUpModal}
        openModal={openFollowModal}
        setIsOpen={setFollowUpModal}
        getFollowUps={getFollowUps}
      />
      <div className={styles.follow}>
        <div className={styles.header}>
          <h1>Follow Up</h1>
        </div>
        <div className={styles.data}>
          {followUp
            ?.filter((follow) => {
              if (
                new Date(Date.now()).toString().slice(4, 16) ===
                new Date(follow.startDate).toString().slice(4, 16)
              ) {
                return follow;
              }
            })
            .map((follow) => {
              return <Bar follow={follow} />;
            })}
        </div>
      </div>
    </>
  );
};

export default FollowUp;
