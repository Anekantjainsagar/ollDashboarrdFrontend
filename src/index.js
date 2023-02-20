import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import StudentState from "./Components/Context/StudentState";
import B2BState from "./Monitor/Context/B2BState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StudentState>
      <B2BState>
        <Router>
          <App />
        </Router>
      </B2BState>
    </StudentState>
  </React.StrictMode>
);
