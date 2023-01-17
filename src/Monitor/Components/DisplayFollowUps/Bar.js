import axios from "axios";
import React, { useEffect, useState } from "react";
import MONITOR_BACKEND from "../../Utils/index";
import AddStatusfollows from "../AddStatusFollowUp/index";
import styles from "./style.module.css";

const Bar = ({ follow, schools, getFollowUps, getUsers }) => {
  const [school, setSchool] = useState("");

  useEffect(() => {
    const sch = schools?.find((e) => {
      return e?._id === follow?.schoolId;
    });
    setSchool(sch);
  }, [schools, follow?.schoolId]);

  const [followUpModal, setFollowUpModal] = useState(false);
  function openFollowModal() {
    setFollowUpModal(true);
  }

  const user = {
    schoolName: follow?.name,
    _id: follow?.userId,
    schoolId: follow?.schoolId,
  };

  return (
    <>
      <AddStatusfollows
        modalIsOpen={followUpModal}
        openModal={openFollowModal}
        setIsOpen={setFollowUpModal}
        user={user}
        getFollowUps={getFollowUps}
        getUsers={getUsers}
      />
      <div className={styles.bar}>
        <div className={styles.header}>
          <h1>{follow?.name}</h1>
          <p className={styles.date}>
            {new Date(follow?.startDate).toString().slice(4, 16)} {follow?.time}
          </p>
        </div>
        <div className={styles.barStyle}>
          <p>{school?.email}</p>
          <p>{school?.phone}</p>
        </div>
      </div>
    </>
  );
};

export default Bar;
