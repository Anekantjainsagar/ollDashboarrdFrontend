import React, { useState } from "react";
import B2BContext from "./B2BContext";

const B2BState = (props) => {
  const [login, setLogin] = useState();

  return (
    <B2BContext.Provider value={{ login, setLogin }}>
      {props.children}
    </B2BContext.Provider>
  );
};

export default B2BState;
