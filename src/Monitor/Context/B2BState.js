import React, { useEffect, useState } from "react";
import B2BContext from "./B2BContext";
import axios from "axios";
const uri = "https://crm.oll.co/api/hr";

const B2BState = (props) => {
  const [login, setLogin] = useState();
  const [dropDown, setDropDown] = useState(true);
  const [allEmployees, setAllEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [appreciations, setAppreciations] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [empPage, setEmpPage] = useState(1);
  const [empSearch, setEmpSearch] = useState("");
  const [leaveSearch, setLeaveSearch] = useState("");
  const [noOfEmps, setNoOfEmps] = useState();

  // Employees
  const getEmployees = () => {
    axios
      .get(
        `${uri}/getEmployees?page=${empPage}&size=${
          empPage * 10
        }&search=${empSearch}`
      )
      .then((response) => {
        setNoOfEmps(response.data.noOfEmployees);
        setEmployees(response.data.employees);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllEmployees = () => {
    axios.get(`${uri}/getAllEmployees`).then((res) => {
      setAllEmployees(res.data.employees);
    });
  };

  const addEmployee = ({ details }) => {
    axios
      .post(`${uri}/addEmployee`, { ...details })
      .then((res) => {
        getEmployees();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStatus = ({ details }) => {
    axios
      .put(`${uri}/setStatus`, { ...details })
      .then((res) => {
        getEmployees();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteEmployee = ({ id }) => {
    axios
      .delete(`${uri}/deleteEmployee`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        getEmployees();
      });
  };

  // Appreciations
  const addAppreciations = ({ details }) => {
    axios
      .post(`${uri}/addAppreciations`, { ...details })
      .then((res) => {
        getAppreciations();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAppreciations = ({ id }) => {
    axios
      .delete(`${uri}/deleteAppreciation`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        getAppreciations();
      });
  };

  const getAppreciations = () => {
    axios
      .get(`${uri}/getAppreciations`)
      .then((response) => {
        setAppreciations(response.data.appreciations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Designation
  const addDesignation = ({ details }) => {
    axios
      .post(`${uri}/addDesignation`, { ...details })
      .then((res) => {
        getDesignations();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDesignations = ({ id }) => {
    axios
      .delete(`${uri}/deleteDesignation`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        getDesignations();
      });
  };

  const getDesignations = () => {
    axios
      .get(`${uri}/getDesignation`)
      .then((response) => {
        setDesignations(response.data.designations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Designation
  const addDepartment = ({ details }) => {
    axios
      .post(`${uri}/addDepartment`, { ...details })
      .then((res) => {
        getDepartments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDepartment = ({ id }) => {
    axios
      .delete(`${uri}/deleteDepartment`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        getDepartments();
      });
  };

  const getDepartments = () => {
    axios
      .get(`${uri}/getDepartments`)
      .then((response) => {
        setDepartments(response.data.departments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Leaves
  const getLeaves = () => {
    axios
      .get(`${uri}/getAllLeaves?search=${leaveSearch}`)
      .then((response) => {
        setLeaves(response.data.leaves);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addLeave = ({ details }) => {
    axios
      .post(`${uri}/addLeave`, { ...details })
      .then((res) => {
        getLeaves();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setLeaveStatus = ({ details }) => {
    console.log(details);
    axios
      .put(`${uri}/setLeaveStatus`, { ...details })
      .then((res) => {
        getLeaves();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setIsPaid = ({ details }) => {
    axios
      .put(`${uri}/setIsPaid`, { ...details })
      .then((res) => {
        getLeaves();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteLeave = ({ id }) => {
    axios
      .delete(`${uri}/deleteLeave`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        getLeaves();
      });
  };

  // Holiday
  const addHoliday = ({ details }) => {
    axios
      .post(`${uri}/addHoliday`, { ...details })
      .then((res) => {
        getHolidays();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHoliday = ({ id }) => {
    axios
      .delete(`${uri}/deleteHoliday`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        getHolidays();
      });
  };

  const getHolidays = () => {
    axios
      .get(`${uri}/getHolidays`)
      .then((response) => {
        setHolidays(response.data.holidays);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Attendance
  const setPresent = ({ details }) => {
    axios
      .put(`${uri}/setPresent`, { ...details })
      .then((res) => {
        getEmployees();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setHalfDay = ({ details }) => {
    axios
      .put(`${uri}/setHalfDay`, { ...details })
      .then((res) => {
        getEmployees();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setAbsent = ({ details }) => {
    axios
      .put(`${uri}/setAbsent`, { ...details })
      .then((res) => {
        getEmployees();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const employee = {
    noOfEmps,
    addEmployee,
    empPage,
    setEmpPage,
    employees,
    setEmployees,
    empSearch,
    deleteEmployee,
    updateStatus,
    setEmpSearch,
    allEmployees,
    getEmployees,
  };

  const appreciation = {
    addAppreciations,
    deleteAppreciations,
    getAppreciations,
    appreciations,
  };

  const designation = {
    addDesignation,
    deleteDesignations,
    designations,
  };

  const department = {
    addDepartment,
    deleteDepartment,
    departments,
  };

  const leave = {
    leaves,
    leaveSearch,
    setLeaveSearch,
    getLeaves,
    addLeave,
    setLeaveStatus,
    setIsPaid,
    deleteLeave,
  };

  const holiday = {
    holidays,
    addHoliday,
    deleteHoliday,
  };

  const attendance = {
    setPresent,
    setAbsent,
    setHalfDay,
  };

  useEffect(() => {
    getEmployees();
  }, [empSearch, empPage]);

  useEffect(() => {
    getLeaves();
  }, [leaveSearch]);

  useEffect(() => {
    getAppreciations();
    getAllEmployees();
    getDesignations();
    getDepartments();
    getHolidays();
  }, []);

  return (
    <B2BContext.Provider
      value={{
        login,
        setLogin,
        dropDown,
        setDropDown,
        employee,
        appreciation,
        designation,
        department,
        leave,
        holiday,
        attendance,
      }}
    >
      {props.children}
    </B2BContext.Provider>
  );
};

export default B2BState;
