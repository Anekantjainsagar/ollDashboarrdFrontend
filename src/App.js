import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sales from "./Components/Sales/index";
import Login from "./Components/Login/Login";
import Support from "./Components/Support/index";
import axios from "axios";
import { BASE_URL } from "./Utils";

const App = () => {
  const history = useNavigate();
  const location = useLocation();
  const [sales, setsales] = useState([]);
  const [checkUser, setcheck] = useState([]);

  const check = async () => {
    await axios
      .post(`${BASE_URL}/salesCheck`, {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        setcheck(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      if (checkUser?._id == sales?._id) {
        history(`/${sales?.type}`);
      }
    } else {
      history("/");
    }
    check();
  }, [location.pathname, sessionStorage.getItem("token"), sales]);

  return (
    <Routes>
      <Route path="/" element={<Login setsales={setsales} />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/Operations" element={<Support />} />
      <Route path="*" render={() => <Navigate to="/" />} />
      <Route path="/undefined" element={<Login setsales={setsales} />} />
    </Routes>
  );
};

export default App;
