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
        const obj = res.data.message;
        if (Object.keys(obj)[0] === "_id") {
          setcheck(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const token = sessionStorage?.getItem("token");
  useEffect(() => {
    if (token?.length > 0) {
      if (checkUser?._id == sales?._id) {
        if (location.pathname == "/") {
          history(`/${sales?.type}`);
        }
      }
    } else {
      history("/");
    }
    check();
  }, [location.pathname, token, sales, checkUser]);

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
