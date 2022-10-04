import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sales from "./Components/Sales/index";
import Login from "./Components/Login/Login";
import Support from "./Components/Support/index";
import Training from './Components/Training/index'
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
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        const obj = res.data.message;
        if (Object.keys(obj)[0] === "_id") {
          setcheck(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const token = localStorage?.getItem("token");

  const checkLogin = async () => {
    if (token?.length > 0) {
      await check();
      if (Object.keys(checkUser)[0] === "_id") {
        history(`/${checkUser?.type}`);
      }
    } else {
      history("/");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [location.pathname, token]);

  return (
    <Routes>
      <Route path="/" element={<Login setsales={setsales} />} />
      <Route path="/sales" element={<Sales sales={checkUser} />} />
      <Route path="/Operations" element={<Support sales={checkUser} />} />
      <Route path="/training" element={<Training sales={checkUser} />} />
      <Route path="*" render={() => <Navigate to="/" />} />
      <Route path="/undefined" element={<Login setsales={setsales} />} />
    </Routes>
  );
};

export default App;
