import React from "react";
import styles from "./style.module.css";

const Bar = ({ report }) => {
  console.log(report.batchDetails);
  return (
    <>
      <div className={styles.bar}>
        <h1>STD {report?.className} : DIV A</h1>
        <div className={styles.dataDisplay}>
          <div className={styles.form}>
            <p>No. of Students : {report?.batchDetails?.noOfStudents}</p>
            <p>Location : {report?.batchDetails?.location}</p>
            <p>Days : {report?.batchDetails?.days}</p>
            <p>
              Start Date :{" "}
              {new Date(report?.batchDetails?.startDate)
                .toString()
                .slice(4, 16)}
            </p>
            <p>Time : {report?.batchDetails?.time}</p>
            <p>Holidays : {report?.batchDetails?.holidays}</p>
            <p>No. of Sessions : {report?.batchDetails?.noOfSessions}</p>
            <p>Educator : {report?.batchDetails?.educator}</p>
          </div>
          <div className={styles.data}>
            <div className={styles.head}>
              <p>ID</p>
              <p>NAME</p>
              <p>Phone</p>
              <p>EMail</p>
              <p>AMount</p>
              <p>Attend</p>
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
                  <p>Attend</p>
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
