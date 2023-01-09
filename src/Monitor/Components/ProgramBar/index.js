import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { AiFillFileAdd, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Bar from "./Bar";

const ProgramBar = ({ program, reports, programs }) => {
  let totalStudents = 0;
  const history = useNavigate();

  return (
    <>
      <div className={styles.headings} style={{ cursor: "pointer" }}>
        <div className={styles.header}>
          <p className={styles.course}>{program?.school}</p>
          <p className={styles.course}>{program?.name}</p>
          <p className={styles.typeDrop}>Upcoming</p>
          <p className={styles.duration}>
            {program?.pricing?.forEach((e) => {
              totalStudents = totalStudents + parseInt(e?.students);
            })}
            {totalStudents}
          </p>
          <p className={styles.type}>-</p>
          <p className={styles.type}>-</p>
          <p className={styles.resources}>-</p>
          <p className={styles.actions}>
            <AiFillFileAdd
              size={20}
              onClick={(e) => {
                e.preventDefault();
                history(`/programs/report/${program._id}`, { program });
              }}
            />
            <AiFillEye
              size={20}
              style={{ marginLeft: "1rem" }}
              onClick={(e) => {
                e.preventDefault();
                history(`/programs/reportDetails/${program._id}`);
              }}
            />
          </p>
        </div>
        {program?.pricing
          ?.sort((a, b) => a.name - b.name)
          .map((e, i) => {
            return (
              <Bar
                programs={programs}
                key={i}
                reports={reports}
                i={i}
                e={e}
                program={program}
              />
            );
          })}
      </div>
    </>
  );
};

export default ProgramBar;
