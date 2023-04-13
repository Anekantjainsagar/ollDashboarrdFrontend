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

  const context = useContext(B2BContext);
  const [holidayData, setHolidayData] = useState({
    occasion: "",
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
          <h1>Add Holiday</h1>
          <AiOutlineClose
            color="white"
            size={20}
            style={{ cursor: "pointer" }}
            onClick={closeModal}
          />
        </div>
        <div>
          <input
            type="text"
            className={styles.input}
            placeholder="Occasion"
            value={holidayData.occasion}
            onChange={(e) => {
              setHolidayData({ ...holidayData, occasion: e.target.value });
            }}
          />
          <input
            type="date"
            className={styles.input}
            placeholder="Leave Date"
            value={holidayData.date}
            onChange={(e) => {
              setHolidayData({ ...holidayData, date: e.target.value });
            }}
          />
        </div>
        <button
          style={{ alignSelf: "center", margin: "0.5rem 0" }}
          onClick={(e) => {
            e.preventDefault();
            context.holiday.addHoliday({ details: holidayData });
            setHolidayData({
              occasion: "",
              date: new Date().toISOString().split("T")[0],
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
