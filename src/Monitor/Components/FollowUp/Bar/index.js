import React from "react";
import styles from "../style.module.css";

const Bar = ({ follow }) => {
  return (
    <>
      <div className={styles.bar}>
        <div className={styles.barStyle}>
          <p className={styles.date}>
            {new Date(follow?.startDate).toString().slice(4, 16)}
          </p>
          <p className={styles.time}>{follow?.time}</p>
          <p className={styles.title}>{follow?.name}</p>
          <div className={styles.btnBox}>
            <button>WhatsApp</button>
            <button>Email</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bar;
