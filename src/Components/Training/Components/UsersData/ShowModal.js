import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import "../../../../css/Modal.css";
import { css } from "glamor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Shortlisted from "./ShowingApplications/Shortlisted/index";
import Applicants from "./ShowingApplications/Applicants/index";
import Onboarded from "./ShowingApplications/Onboarded/index";

const ShowModal = ({
  setIsOpen,
  modalIsOpen,
  requirement,
  applicants,
  getApplicants,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "80%",
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

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      id="modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="header">
        <h2>{requirement?.course}</h2>
        <AiOutlineClose
          onClick={closeModal}
          color={"#fff"}
          style={{ cursor: "pointer" }}
          size={20}
        />
      </div>
      <Applicants applicants={applicants} />
      <Shortlisted />
      <Onboarded />
    </Modal>
  );
};

export default ShowModal;
