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
  const [empPage, setEmpPage] = useState(1);
  const [empSearch, setEmpSearch] = useState("");

  const getEmployees = () => {
    axios
      .get(
        `${uri}/getEmployees?page=${empPage}&size=${
          empPage * 10
        }&search=${empSearch}`
      )
      .then((response) => {
        console.log(response);
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

  const employee = {
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
  };

  const appreciation = {
    addAppreciations,
    deleteAppreciations,
    getAppreciations,
    appreciations,
  };

  useEffect(() => {
    getEmployees();
  }, [empSearch]);

  useEffect(() => {
    getAppreciations();
    getAllEmployees();
  }, []);

  return (
    <B2BContext.Provider
      value={{ login, setLogin, dropDown, setDropDown, employee, appreciation }}
    >
      {props.children}
    </B2BContext.Provider>
  );
};

export default B2BState;
