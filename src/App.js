import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sales from "./Components/Sales/index";
import Login from "./Components/Login/Login";
import Support from "./Components/Support/index";

const App = () => {
  const history = useNavigate();
  const location = useLocation();
  const [sales, setsales] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      console.log("Pushed");
      history("/");
    }
  }, [location.pathname]);

  return (
    <Routes>
      (<Route path="/" element={<Login sales={sales} setsales={setsales} />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/oprations" element={<Support />} />)
    </Routes>
  );
};

export default App;
