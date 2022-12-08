import React, { useState } from "react";
import styles from "./style.module.css";

const ProgramBar = ({ program }) => {
  return (
    <>
      <div className={styles.headings} style={{ cursor: "pointer" }}>
        <p className={styles.checkBox} onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" />
        </p>
        <p className={styles.course}>{program?.name}</p>
        <p className={styles.typeDrop}>{program?.model}</p>
        <p className={styles.duration}>{program?.mode}</p>
        <p className={styles.type}>{program?.payment}</p>
        <p className={styles.type}>{program?.training}</p>
        <p className={styles.resources}>{program?.terms}</p>
        <p className={styles.actions}>Actions</p>
      </div>
    </>
  );
};

export default ProgramBar;
