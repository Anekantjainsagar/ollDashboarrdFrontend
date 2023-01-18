import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import StudentState from "./Components/Context/StudentState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StudentState>
      <Router>
        <App />
      </Router>
    </StudentState>
  </React.StrictMode>
);
