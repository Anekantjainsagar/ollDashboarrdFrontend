import axios from "axios";
import React, { useEffect, useState } from "react";
import MONITOR_BACKEND from "../../../Utils";
import AddStatusfollows from "../../AddStatusFollowUp";
import styles from "../style.module.css";

const Bar = ({ follow, schools, getFollowUps, getUsers }) => {
  const [school, setSchool] = useState("");

  useEffect(() => {
    const sch = schools?.filter((e) => {
      return follow?.name === e?.name;
    });
    setSchool(sch[0]);
  }, [follow]);

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
        <div className={styles.barStyle}>
          <p className={styles.date}>
            {new Date(follow?.startDate).toString().slice(4, 16)}
          </p>
          <p className={styles.time}>{follow?.time}</p>
          <p className={styles.title}>{follow?.name}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              wordBreak: "normal",
            }}
          >
            <p style={{ wordBreak: "normal" }}>{school?.email}</p>
            <p>{school?.phone}</p>
          </div>
          <div className={styles.btnBox}>
            <input
              type="checkbox"
              checked={follow?.done}
              onChange={(e) => {
                if (e.target.checked === true) {
                  axios
                    .put(`${MONITOR_BACKEND}/setDone`, {
                      id: follow._id,
                      done: true,
                    })
                    .then((res) => {
                      console.log(res);
                      getFollowUps();
                      openFollowModal();
                    });
                } else {
                  axios
                    .put(`${MONITOR_BACKEND}/setDone`, {
                      id: follow._id,
                      done: false,
                    })
                    .then((res) => {
                      getFollowUps();
                      console.log(res);
                    });
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bar;
