import React, { useState } from "react";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../Utils";

const AddDataModal = ({
  setIsOpen,
  modalIsOpen,
  setDataSaved,
  getUserData,
}) => {
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
      zIndex: 10,
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

  const postData = async () => {
    const res = await axios.post(`${BASE_URL}/addUser`, {
      name: data?.name,
      phone,
      email: data?.email,
      age,
      school: data?.school,
      stage: "🔥 hot",
      status: "new",
      assignee: "Saman",
      source: "Website",
    });
    if (res.status === 500) {
      alert("Internal server error");
    }

    if (res.data.message === "User Saved Successfully") {
      setData({ name: "", email: "", school: "" });
      setPhone("");
      setAge("");
    }
    setTimeout(() => {
      getUserData();
    }, 500);

    const notify = () =>
      toast(res.data.message, {
        type: res.data.success
          ? "success"
          : res.data.message === "User Saved Successfully"
          ? "success"
          : "error",
      }).configure({
        bodyClassName: css({
          backgroundColor: "blue",
          height: "100%",
          width: "100%",
        }),
      });
    notify();
  };

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
            if (phone?.length > 0) {
              postData();
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
