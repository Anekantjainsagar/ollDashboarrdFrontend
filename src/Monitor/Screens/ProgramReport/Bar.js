import axios from "axios";
import React, { useState } from "react";
import styles from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import MONITOR_BACKEND from "../../Utils/index";

const Bar = ({ report, getReports }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [daysValue, setDays] = useState(false);
  const [daysPositio, setDaysPositio] = useState({ x: "", y: "" });
  const [student, setStudent] = useState({
    name: "",
    phone: "",
    email: "",
    amount: parseInt(report?.price),
  });
  const [batchDetails, setBatchDetails] = useState({
    noOfStudents: parseInt(report?.noOfStudents),
    location: "",
    days: [],
    startDate: "",
    time: "",
    holidays: "",
    noOfSessions: "",
    completedSessions: "",
    endDate: "",
    educator: "",
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
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>No. of Students</p>
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
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>Course</p>
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
                placeholder="Course"
              />
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>Days</p>
              <input
                type="text"
                onClick={(e) => {
                  setDays(!daysValue);
                  setDaysPositio({ x: e.clientX, y: e.clientY });
                }}
                placeholder="Days"
              />
            </div>
            <div
              className={styles.daysDisplay}
              style={
                daysValue
                  ? {
                      display: "block",
                      left: "25.25%",
                      top: `${daysPositio.y + 30}px`,
                    }
                  : { display: "none" }
              }
            >
              {days?.map((e, i) => {
                return (
                  <div key={i}>
                    <input
                      type="checkbox"
                      value={e}
                      checked={
                        batchDetails?.days?.length > 0
                          ? batchDetails?.days.includes(e)
                          : report?.batchDetails?.days.includes(e)
                      }
                      style={{ width: "10%", margin: "1rem" }}
                      onChange={async (e) => {
                        setBatchDetails({
                          ...batchDetails,
                          days: [...batchDetails.days],
                        });
                        if (
                          batchDetails?.days?.includes(e.target.value) === false
                        ) {
                          if (e.target.checked === true) {
                            setBatchDetails({
                              ...batchDetails,
                              days: [...batchDetails.days, e.target.value],
                            });
                          }
                        } else if (e.target.checked === false) {
                          let arr = [...batchDetails?.days];
                          const index = arr.indexOf(e.target.value);
                          arr.splice(index, 1);
                          setBatchDetails({ ...batchDetails, days: [...arr] });
                        }
                      }}
                    />
                    <p>{e}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>Start Date</p>
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
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>End Date</p>
              <input
                type="date"
                value={
                  batchDetails?.endDate
                    ? batchDetails?.endDate
                    : report?.batchDetails?.endDate.slice(0, 10)
                }
                onChange={(e) =>
                  setBatchDetails({
                    ...batchDetails,
                    endDate: e.target.value,
                  })
                }
                placeholder="End Date"
              />
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>Time</p>
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
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>Holidays</p>
              <input
                type="text"
                placeholder="Holidays"
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
              />
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>No. of Sessions</p>
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
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>Completed Sess.</p>
              <input
                type="number"
                value={
                  batchDetails?.completedSessions
                    ? batchDetails?.completedSessions
                    : report?.batchDetails?.completedSessions
                }
                onChange={(e) =>
                  setBatchDetails({
                    ...batchDetails,
                    completedSessions: e.target.value,
                  })
                }
                placeholder="Completed Sessions"
              />
            </div>
            <div className={styles.div}>
              <p style={{ textAlign: "center" }}>Educator</p>
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
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(batchDetails);
                if (
                  batchDetails?.noOfStudents !== "" &&
                  batchDetails?.days?.length > 0 &&
                  batchDetails?.location?.length > 0 &&
                  batchDetails?.startDate?.length > 0 &&
                  batchDetails?.time?.length > 0 &&
                  batchDetails?.holidays?.length > 0 &&
                  batchDetails?.noOfSessions?.length > 0 &&
                  batchDetails?.endDate?.length > 0 &&
                  batchDetails?.completedSessions?.length > 0 &&
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
                } else {
                  if (
                    batchDetails?.noOfStudents.length === 0 ||
                    batchDetails?.noOfStudents.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill Number of students", {
                        type: "warning",
                      });
                    notify();
                  } else if (batchDetails?.days.length === 0) {
                    const notify = () =>
                      toast("Please fill Days", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.location.length === 0 ||
                    batchDetails?.location.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill Course name", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.startDate.length === 0 ||
                    batchDetails?.startDate.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill the Start Date", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.time.length === 0 ||
                    batchDetails?.time.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill the Time", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.endDate.length === 0 ||
                    batchDetails?.endDate.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill the End Date", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.completedSessions.length === 0 ||
                    batchDetails?.completedSessions.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill the No. of Completed Sessions", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.holidays.length === 0 ||
                    batchDetails?.holidays.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill the Holidays", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.noOfSessions.length === 0 ||
                    batchDetails?.noOfSessions.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill the Number of sessions", {
                        type: "warning",
                      });
                    notify();
                  } else if (
                    batchDetails?.educator.length === 0 ||
                    batchDetails?.educator.length === ""
                  ) {
                    const notify = () =>
                      toast("Please fill Educator name", {
                        type: "warning",
                      });
                    notify();
                  }
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
                      <option value="Sessions Done">Sessions Done</option>
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
