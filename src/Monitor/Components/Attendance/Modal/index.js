import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

function AddModal({ setIsOpen, modalIsOpen }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
      width: "25%",
      borderRadius: "1rem",
      display: "flex",
      flexDirection: "column",
    },
  };
  function closeModal() {
    setIsOpen(false);
  }

  const context = useContext(B2BContext);
  const [attendanceData, setAttendanceData] = useState({
    id: context?.employee?.employees[0]?._id,
    type: "Present",
    date: new Date().toISOString().split("T")[0],
  });
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={styles.header}>
          <h1>Add Attendance</h1>
          <AiOutlineClose
            color="white"
            size={20}
            style={{ cursor: "pointer" }}
            onClick={closeModal}
          />
        </div>
        <div>
          <select
            className={styles.select}
            value={attendanceData.id}
            onChange={(e) => {
              setAttendanceData({
                ...attendanceData,
                id: e.target.value,
              });
            }}
          >
            {context?.employee?.employees?.map((e) => {
              return <option value={e._id}>{e.name}</option>;
            })}
          </select>
          <select
            className={styles.select}
            value={attendanceData.type}
            onChange={(e) => {
              setAttendanceData({
                ...attendanceData,
                type: e.target.value,
              });
            }}
          >
            {["Present", "Absent", "Half Day"]?.map((e) => {
              return <option value={e}>{e}</option>;
            })}
          </select>
          <input
            type="date"
            className={styles.input}
            placeholder="Attendance Date"
            value={attendanceData.date}
            onChange={(e) => {
              setAttendanceData({ ...attendanceData, date: e.target.value });
            }}
          />
        </div>
        <button
          style={{ alignSelf: "center", margin: "0.5rem 0" }}
          onClick={(e) => {
            e.preventDefault();
            if (attendanceData.type === "Present") {
              context.attendance.setPresent({ details: attendanceData });
            } else if (attendanceData.type === "Absent") {
              context.attendance.setAbsent({
                details: attendanceData,
              });
            } else {
              context.attendance.setHalfDay({
                details: attendanceData,
              });
            }
            setAttendanceData({
              id: context?.employee?.employees[0]?._id,
              type: "Present",
              date: new Date().toISOString().split("T")[0],
            });
            closeModal();
          }}
        >
          Add Attendance
        </button>
      </Modal>
    </div>
  );
}

export default AddModal;
