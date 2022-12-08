import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styles from "./style.module.css";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SchoolModal = ({ setIsOpen, modalIsOpen, getSchools }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "40%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      padding: "1rem 2rem",
      borderRadius: "1rem",
      backgroundColor: "#000",
    },
  };

  const [school, setSchool] = useState({
    name: "",
    website: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    schoolLink: "",
    board: "",
    type: "",
    noOfStudents: "",
    schoolFee: "",
    category: "",
    principal: {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
    trustee: {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
    coordinator: {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
  });
  const [logo, setLogo] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  const addSchool = () => {
    var id;
    if (
      (school.name.length > 0 && school.phone.length > 0) ||
      (school.name.length > 0 && school.email.length > 0)
    ) {
      axios
        .post(`${MONITOR_BACKEND}/addSchool`, school)
        .then((response) => {
          id = response.data.school._id;
          if (id && logo) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("logo", logo);
            if (logo) {
              axios
                .put(`${MONITOR_BACKEND}/addLogo`, formData)
                .then((response) => {
                  console.log(response);
                  if (response.data.data.modifiedCount > 0) {
                    closeModal();
                    const notify = () =>
                      toast("School Saved Successfully", {
                        type: "success",
                      });
                    setTimeout(() => {
                      getSchools();
                    }, 500);
                    notify();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            closeModal();
            const notify = () =>
              toast("School Saved Successfully", {
                type: "success",
              });
            setTimeout(() => {
              getSchools();
            }, 500);
            notify();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div style={{ position: "absolute" }}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        id="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form encType="multipart/form-data">
          <div className={styles.header}>
            <h1>School Details</h1>
            <button className={styles.import}>Import</button>
            <AiOutlineClose
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => closeModal()}
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.firstLine}>
              <input
                className={styles.mInput}
                type="text"
                value={school.name}
                onChange={(e) => setSchool({ ...school, name: e.target.value })}
                placeholder="Name *"
              />
              <input
                type="file"
                onChange={(e) => setLogo(e.target?.files[0])}
              />
              <input
                className={styles.mInput}
                type="url"
                value={school.website}
                onChange={(e) =>
                  setSchool({ ...school, website: e.target.value })
                }
                placeholder="Website"
              />
            </div>
            <div className={styles.secondLine}>
              <input
                className={styles.mInput}
                type="text"
                placeholder="Address"
                value={school.address}
                onChange={(e) =>
                  setSchool({ ...school, address: e.target.value })
                }
              />
              <input
                className={styles.mInput}
                type="text"
                placeholder="City"
                value={school.city}
                onChange={(e) => setSchool({ ...school, city: e.target.value })}
              />
              <input
                className={styles.mInput}
                type="text"
                placeholder="State"
                value={school.state}
                onChange={(e) =>
                  setSchool({ ...school, state: e.target.value })
                }
              />
            </div>
            <div className={styles.thirdLine}>
              <input
                className={styles.mInput}
                type="email"
                placeholder="Email ID"
                value={school.email}
                onChange={(e) =>
                  setSchool({ ...school, email: e.target.value })
                }
              />
              <input
                className={styles.mInput}
                type="number"
                placeholder="Phone *"
                value={school.phone}
                onChange={(e) =>
                  setSchool({ ...school, phone: e.target.value })
                }
              />
              <input
                className={styles.mInput}
                type="url"
                placeholder="School Link"
                value={school.schoolLink}
                onChange={(e) =>
                  setSchool({ ...school, schoolLink: e.target.value })
                }
              />
            </div>
            <div className={styles.fourthLine}>
              <input
                className={styles.mInput}
                type="text"
                placeholder="Board"
                value={school.board}
                onChange={(e) =>
                  setSchool({ ...school, board: e.target.value })
                }
              />
              <input
                className={styles.mInput}
                type="text"
                placeholder="Type"
                value={school.type}
                onChange={(e) => setSchool({ ...school, type: e.target.value })}
              />
              <input
                className={styles.mInput}
                type="number"
                placeholder="No. of Students"
                value={school.noOfStudents}
                onChange={(e) =>
                  setSchool({ ...school, noOfStudents: e.target.value })
                }
              />
            </div>
            <div className={styles.fifthLine}>
              <input
                className={styles.mInput}
                type="text"
                placeholder="School Fees"
                value={school.schoolFee}
                onChange={(e) =>
                  setSchool({ ...school, schoolFee: e.target.value })
                }
              />
              <input
                className={styles.mInput}
                type="text"
                placeholder="Category"
                value={school.category}
                onChange={(e) =>
                  setSchool({ ...school, category: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles.addingSchoolInfo}>
            <div className={styles.principal}>
              <div className={styles.head}>
                <p>Principal</p>
                <AiOutlinePlus className={styles.icon} size={20} />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={school.principal.name}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    principal: { ...school.principal, name: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={school.principal.email}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    principal: { ...school.principal, email: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={school.principal.phone}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    principal: { ...school.principal, phone: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Role"
                value={school.principal.role}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    principal: { ...school.principal, role: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className={styles.addingSchoolInfo}>
            <div className={styles.principal}>
              <div className={styles.head}>
                <p>Trustee</p>
                <AiOutlinePlus className={styles.icon} size={20} />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={school.trustee.name}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    trustee: { ...school.trustee, name: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={school.trustee.email}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    trustee: { ...school.trustee, email: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={school.trustee.phone}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    trustee: { ...school.trustee, phone: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Role"
                value={school.trustee.role}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    trustee: { ...school.trustee, role: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className={styles.addingSchoolInfo}>
            <div className={styles.principal}>
              <div className={styles.head}>
                <p>Coordinator</p>
                <AiOutlinePlus className={styles.icon} size={20} />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={school.coordinator.name}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    coordinator: {
                      ...school.coordinator,
                      name: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={school.coordinator.email}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    coordinator: {
                      ...school.coordinator,
                      email: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={school.coordinator.phone}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    coordinator: {
                      ...school.coordinator,
                      phone: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Role"
                value={school.coordinator.role}
                onChange={(e) =>
                  setSchool({
                    ...school,
                    coordinator: {
                      ...school.coordinator,
                      role: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <button
            className={styles.saveBtn}
            onClick={(e) => {
              e.preventDefault();
              addSchool();
            }}
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default SchoolModal;
