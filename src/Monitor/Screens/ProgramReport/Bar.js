import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import MONITOR_BACKEND from "../../Utils/index";

const Bar = ({ report, getReports }) => {
  const [student, setStudent] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
  });
  const [batchDetails, setBatchDetails] = useState({
    noOfStudents: undefined,
    location: undefined,
    days: undefined,
    startDate: undefined,
    time: undefined,
    holidays: undefined,
    noOfSessions: undefined,
    educator: undefined,
  });
  return (
    <>
      <div style={{ position: "absolute" }}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <div className={styles.bar}>
        <div className={styles.head}>
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
          <div>
            <input
              type="text"
              placeholder="Name"
              value={student?.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={student?.phone}
              onChange={(e) =>
                setStudent({ ...student, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Email"
              value={student?.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Amount"
              value={student?.amount}
              onChange={(e) =>
                setStudent({ ...student, amount: e.target.value })
              }
            />
            <button
              style={{ width: "19%", padding: "0.2rem 0" }}
              onClick={(e) => {
                e.preventDefault();
                if (student?.name?.length > 0) {
                  axios
                    .put(`${MONITOR_BACKEND}/addStudent`, {
                      ...student,
                      id: report?._id,
                    })
                    .then((res) => {
                      if (res.data?.modifiedCount > 0) {
                        getReports();
                        setStudent({
                          name: "",
                          phone: "",
                          email: "",
                          amount: "",
                        });
                      }
                    });
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className={styles.dataDisplay}>
          <div className={styles.form}>
            <input
              type="number"
              value={
                batchDetails?.noOfStudents
                  ? batchDetails?.noOfStudents
                  : report?.batchDetails?.noOfStudents
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  noOfStudents: e.target.value,
                })
              }
              placeholder="No. of Students"
            />
            <input
              type="text"
              value={
                batchDetails?.location
                  ? batchDetails?.location
                  : report?.batchDetails?.location
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />
            <input
              type="text"
              value={
                batchDetails?.days
                  ? batchDetails?.days
                  : report?.batchDetails?.days
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  days: e.target.value,
                })
              }
              placeholder="Days"
            />
            <input
              type="date"
              value={
                batchDetails?.startDate
                  ? batchDetails?.startDate
                  : report?.batchDetails?.startDate.slice(0, 10)
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  startDate: e.target.value,
                })
              }
              placeholder="Start Date"
            />
            <input
              type="time"
              value={
                batchDetails?.time
                  ? batchDetails?.time
                  : report?.batchDetails?.time
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  time: e.target.value,
                })
              }
              placeholder="Time"
            />
            <input
              type="text"
              value={
                batchDetails?.holidays
                  ? batchDetails?.holidays
                  : report?.batchDetails?.holidays
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  holidays: e.target.value,
                })
              }
              placeholder="Holidays"
            />
            <input
              type="number"
              value={
                batchDetails?.noOfSessions
                  ? batchDetails?.noOfSessions
                  : report?.batchDetails?.noOfSessions
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  noOfSessions: e.target.value,
                })
              }
              placeholder="No. of Sessions"
            />
            <input
              type="text"
              value={
                batchDetails?.educator
                  ? batchDetails?.educator
                  : report?.batchDetails?.educator
              }
              onChange={(e) =>
                setBatchDetails({
                  ...batchDetails,
                  educator: e.target.value,
                })
              }
              placeholder="Educator"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (
                  batchDetails?.noOfStudents?.length > 0 &&
                  batchDetails?.days?.length > 0 &&
                  batchDetails?.location?.length > 0 &&
                  batchDetails?.startDate?.length > 0 &&
                  batchDetails?.time?.length > 0 &&
                  batchDetails?.holidays?.length > 0 &&
                  batchDetails?.noOfSessions?.length > 0 &&
                  batchDetails?.educator?.length > 0
                ) {
                  axios
                    .put(`${MONITOR_BACKEND}/addBatchDetails`, {
                      ...batchDetails,
                      id: report?._id,
                    })
                    .then((res) => {
                      if (res?.data?.modifiedCount > 0) {
                        const notify = () =>
                          toast("Batch Details added successfully", {
                            type: "success",
                          }).configure({
                            bodyClassName: css({
                              backgroundColor: "blue",
                              height: "100%",
                              width: "100%",
                            }),
                          });
                        getReports();
                        notify();
                      }
                    });
                }
              }}
            >
              Save
            </button>
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
            {report?.students?.map((e, i) => {
              return (
                <div className={styles.user}>
                  <p>{i + 1}</p>
                  <p>{e?.name}</p>
                  <p>{e?.phone}</p>
                  <p>{e?.email}</p>
                  <p>{e?.amount}</p>
                  <p>Attend</p>
                  <p>
                    <select
                      name=""
                      id=""
                      value={e?.status}
                      onChange={(event) => {
                        setStudent({ ...student, status: event.target.value });
                        axios
                          .put(`${MONITOR_BACKEND}/setStudentStatus`, {
                            id: report?._id,
                            status: event.target.value,
                            email: e?.email,
                          })
                          .then((res) => {
                            console.log(res.data.modifiedCount);
                            setTimeout(() => {
                              getReports();
                            }, 500);
                          });
                      }}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                      <option value="Started">Started</option>
                      <option value="Kit Rec.">Kit Rec.</option>
                      <option value="Kit Pen.">Kit Pen.</option>
                    </select>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {report?.division > 9 ? (
        <></>
      ) : false ? (
        <></>
      ) : (
        <div
          className={styles.newBar}
          onClick={(event) => {
            event.preventDefault();
            axios
              .post(`${MONITOR_BACKEND}/addReport`, {
                className: report?.className,
                noOfStudents: report?.noOfStudents,
                price: report?.price,
                school: report?.school,
                offer: report?.offer,
                programId: report?.programId,
                division: (report?.division ? report?.division : 1) + 1,
              })
              .then((res) => {
                axios.put(`${MONITOR_BACKEND}/updatePricing`, {
                  id: report?.programId,
                  name: report?.className,
                  value: report?.price,
                  students: report?.noOfStudents,
                  division: (report?.division ? report?.division : 1) + 1,
                });
                getReports();
              });
          }}
        >
          Add New Division
        </div>
      )}
    </>
  );
};

export default Bar;
