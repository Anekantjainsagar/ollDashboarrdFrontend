import React from "react";
import styles from "./style.module.css";
import { AiFillFileAdd, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProgramBar = ({ program }) => {
  let totalStudents = 0;
  const history = useNavigate();
  return (
    <>
      <div className={styles.headings} style={{ cursor: "pointer" }}>
        <div className={styles.header}>
          <p className={styles.checkBox}>1</p>
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
                history(`/programs/report/${program._id}`);
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
              <div className={styles.bar}>
                <p>{i + 1}</p>
                <p>
                  STD {e?.name} : DIV{" "}
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
                <p>Upcoming</p>
                <p>{e?.students}</p>
                <p>-</p>
                <p>-</p>
                <p>-</p>
                <p>-</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProgramBar;
