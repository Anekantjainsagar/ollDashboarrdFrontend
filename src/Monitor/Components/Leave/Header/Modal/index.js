import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import B2BContext from "../../../../Context/B2BContext";

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
  const [leavesData, setLeavesData] = useState({
    name: "Employee Name",
    leaveDate: new Date().toISOString().split("T")[0],
  });

  const context = useContext(B2BContext);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={styles.header}>
          <h1>Add Leave</h1>
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
            value={leavesData.name}
            onChange={(e) => {
              setLeavesData({
                ...leavesData,
                name: e.target.value,
              });
            }}
          >
            <option value="Employee Name" disabled>
              Employee Name
            </option>
            {context?.employee?.employees?.map((e) => {
              return <option value={e.name}>{e.name}</option>;
            })}
          </select>
          <input
            type="date"
            className={styles.input}
            placeholder="Leave Date"
            value={leavesData.leaveDate}
            onChange={(e) => {
              setLeavesData({ ...leavesData, leaveDate: e.target.value });
            }}
          />
        </div>
        <button
          style={{ alignSelf: "center", margin: "0.5rem 0" }}
          onClick={(e) => {
            e.preventDefault();
            context.leave.addLeave({ details: leavesData });
            setLeavesData({
              name: "Employee Name",
              leaveDate: new Date().toISOString().split("T")[0],
            });
            closeModal();
          }}
        >
          Add Leave
        </button>
      </Modal>
    </div>
  );
}

export default AddModal;
