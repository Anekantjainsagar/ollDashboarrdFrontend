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
  const [designation, setDesignation] = useState({
    name: "",
    parent: "-",
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
          <h1>Add Designation</h1>
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
            placeholder="Name"
            value={designation.name}
            onChange={(e) => {
              setDesignation({ ...designation, name: e.target.value });
            }}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Parent Department"
            value={designation.parent}
            onChange={(e) => {
              setDesignation({ ...designation, parent: e.target.value });
            }}
          />
        </div>
        <button
          style={{ alignSelf: "center", margin: "0.5rem 0" }}
          onClick={(e) => {
            e.preventDefault();
            context.designation.addDesignation({ details: designation });
            setDesignation({
              name: "",
              parent: "-",
            });
            closeModal();
          }}
        >
          Add Designation
        </button>
      </Modal>
    </div>
  );
}

export default AddModal;
