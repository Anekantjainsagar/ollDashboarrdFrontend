import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import testData from "./testData";

const AddDataModal = ({ setIsOpen, modalIsOpen, setDataSaved }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "25%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      padding: "1rem 2rem",
      borderRadius: "1rem",
      backgroundColor: "#000",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  const [data, setData] = useState({
    name: "",
    email: "",
    school: "",
  });
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      id="modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "white", fontSize: "2.25rem", margin: "0.5rem 0" }}>
          Add New Data
        </h1>
        <input
          type="text"
          required={true}
          placeholder="Enter the name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="text"
          required={true}
          placeholder="Enter the email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="number"
          required={true}
          placeholder="Enter the age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter the phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the school"
          value={data.school}
          onChange={(e) => setData({ ...data, school: e.target.value })}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (data?.name?.length > 0 && phone?.length > 0) {
              testData.push({ ...data, phone, age });
              setIsOpen(false);
              setDataSaved(false);
            }
          }}
        >
          Add Data
        </button>
      </div>
    </Modal>
  );
};

export default AddDataModal;
