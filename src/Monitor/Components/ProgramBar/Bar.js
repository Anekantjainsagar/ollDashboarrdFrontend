import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const Bar = ({ programs, reports, i, e }) => {
  return (
    <div className={styles.bar}>
      <p>{i + 1}</p>
      <p>
        STD {e?.className} : DIV{" "}
        {(e?.division ? e?.division : 1) === 1
          ? "A"
          : (e?.division ? e?.division : 2) === 2
          ? "B"
          : (e?.division ? e?.division : 3) === 3
          ? "C"
          : (e?.division ? e?.division : 4) === 4
          ? "D"
          : (e?.division ? e?.division : 5) === 5
          ? "E"
          : (e?.division ? e?.division : 6) === 6
          ? "F"
          : (e?.division ? e?.division : 7) === 7
          ? "G"
          : (e?.division ? e?.division : 8) === 8
          ? "H"
          : (e?.division ? e?.division : 9) === 9
          ? "I"
          : "J"}
      </p>
      <p>-</p>
      <p>{e?.noOfStudents}</p>
      <p>
        {e?.batchDetails?.completedSessions / e?.batchDetails?.noOfSessions
          ? (
              (e?.batchDetails?.completedSessions /
                e?.batchDetails?.noOfSessions) *
              10
            ).toFixed(0) + "%"
          : "-"}
      </p>
      <p>{e?.batchDetails?.educator ? e?.batchDetails?.educator : "-"}</p>
      <p>-</p>
      <p>-</p>
    </div>
  );
};

export default Bar;
