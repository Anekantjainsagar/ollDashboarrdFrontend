import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sales from "./Components/Sales/index";
import Login from "./Components/Login/Login";
import Support from "./Components/Support/index";

const App = () => {
  const [sales, setsales] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login sales={sales} setsales={setsales} />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/support" element={<Support />} />
    </Routes>
  );
};

export default App;
