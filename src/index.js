import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StudentState from "./Components/Context/StudentState";
import B2BState from "./Monitor/Context/B2BState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StudentState>
        <B2BState>
          <App />
        </B2BState>
      </StudentState>
    </BrowserRouter>
  </React.StrictMode>
);
