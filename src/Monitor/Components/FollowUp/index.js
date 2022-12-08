import React, { useState } from "react";
import styles from "./style.module.css";
import { AiOutlinePlus } from "react-icons/ai";
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
          <AiOutlinePlus
            className={styles.plus}
            size={27}
            onClick={() => openFollowModal()}
          />
        </div>
        <div className={styles.data}>
          {followUp?.map((follow) => {
            return <Bar follow={follow} />;
          })}
        </div>
      </div>
    </>
  );
};

export default FollowUp;
