import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentsContext from "./StudentsContext";

const TeacherState = (props) => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get("https://admin.oll.co/api/students-report-new").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StudentsContext.Provider value={{ data }}>
      {props.children}
    </StudentsContext.Provider>
  );
};

export default TeacherState;
