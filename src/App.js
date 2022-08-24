import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sales from "./Components/Sales/index";
import Login from './Components/Login/Login'

const App = () => {
  return (
    <>
      {/* <Login/> */}
      <Sales />
    </>
  );
};

export default App;
