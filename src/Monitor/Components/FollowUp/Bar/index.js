import React from "react";
import styles from "../style.module.css";

const Bar = ({follow}) => {
  return (
    <div className={styles.bar}>
      <p className={styles.time}>{follow?.time}</p>
      <p className={styles.title}>{follow?.name}</p>
      <div className={styles.btnBox}>
        <button>WhatsApp</button>
        <button>Email</button>
      </div>
    </div>
  );
};

export default Bar;
