import React from "react";
import styles from "./style.module.css";

const Bar = ({ report }) => {
  return (
    <>
      <div className={styles.bar}>
        <h1>
          STD {report?.className} : DIV{" "}
          {(report?.division ? report?.division : 1) === 1
            ? "A"
            : (report?.division ? report?.division : 2) === 2
            ? "B"
            : (report?.division ? report?.division : 3) === 3
            ? "C"
            : (report?.division ? report?.division : 4) === 4
            ? "D"
            : (report?.division ? report?.division : 5) === 5
            ? "E"
            : (report?.division ? report?.division : 6) === 6
            ? "F"
            : (report?.division ? report?.division : 7) === 7
            ? "G"
            : (report?.division ? report?.division : 8) === 8
            ? "H"
            : (report?.division ? report?.division : 9) === 9
            ? "I"
            : "J"}
        </h1>
        <div className={styles.dataDisplay}>
          <div className={styles.form}>
            <p>No. of Students : {report?.batchDetails?.noOfStudents}</p>
            <p>Course : {report?.batchDetails?.location}</p>
            <p>
              Days :{" "}
              {report?.batchDetails?.days.map((e) => {
                return " " + e + ",";
              })}
            </p>
            <p>
              Start Date :{" "}
              {new Date(report?.batchDetails?.startDate)
                .toString()
                .slice(4, 16)}
            </p>
            <p>
              End Date :{" "}
              {new Date(report?.batchDetails?.endDate).toString().slice(4, 16)}
            </p>
            <p>Time : {report?.batchDetails?.time}</p>
            <p>Holidays : {report?.batchDetails?.holidays}</p>
            <p>No. of Sessions : {report?.batchDetails?.noOfSessions}</p>
            <p>No. of Sessions : {report?.batchDetails?.completedSessions}</p>
            <p>Educator : {report?.batchDetails?.educator}</p>
          </div>
          <div className={styles.data}>
            <div className={styles.head}>
              <p>ID</p>
              <p>NAME</p>
              <p>Phone</p>
              <p>EMail</p>
              <p>AMount</p>
              <p>Status</p>
            </div>
            {report?.students.map((student, i) => {
              return (
                <div className={styles.user}>
                  <p>{i + 1}</p>
                  <p>{student?.name}</p>
                  <p>{student?.phone}</p>
                  <p>{student?.email}</p>
                  <p>{student?.amount}</p>
                  <p>{student?.status}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bar;
