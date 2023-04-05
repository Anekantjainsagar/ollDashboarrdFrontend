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
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "Department",
    designation: "Designation",
    phone: "",
    role: "User Role",
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
          <h1>Add new Employee</h1>
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
            placeholder="Employee Name"
            value={employee.name}
            onChange={(e) => {
              setEmployee({ ...employee, name: e.target.value });
            }}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Employee Phone"
            value={employee.phone}
            onChange={(e) => {
              setEmployee({ ...employee, phone: e.target.value });
            }}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Employee Email"
            value={employee.email}
            onChange={(e) => {
              setEmployee({ ...employee, email: e.target.value });
            }}
          />
          <select
            name="Designation"
            className={styles.select}
            value={employee.designation}
            onChange={(e) => {
              setEmployee({ ...employee, designation: e.target.value });
            }}
          >
            <option value="Designation" disabled>
              Designation
            </option>
            <option value="Trainee">Trainee</option>
            <option value="Senior">Senior</option>
            <option value="Junior">Junior</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Project Manager">Project Manager</option>
          </select>
          <select
            name="Department"
            className={styles.select}
            value={employee.department}
            onChange={(e) => {
              setEmployee({ ...employee, department: e.target.value });
            }}
          >
            <option value="Department" disabled>
              Department
            </option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Research">Research</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            name="User Role"
            className={styles.select}
            value={employee.role}
            onChange={(e) => {
              setEmployee({ ...employee, role: e.target.value });
            }}
          >
            <option value="User Role" disabled>
              User Role
            </option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="App Administrator">App Administrator</option>
          </select>
        </div>
        <button
          style={{ alignSelf: "center", margin: "0.5rem 0" }}
          onClick={(e) => {
            e.preventDefault();
            context.employee.addEmployee({ details: employee });
            closeModal();
          }}
        >
          Add Employee
        </button>
      </Modal>
    </div>
  );
}

export default AddModal;
