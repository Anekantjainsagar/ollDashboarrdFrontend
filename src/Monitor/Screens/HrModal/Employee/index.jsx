import React from "react";
import Sidebar from "../../../Components/Sidebar/index";
import "../style.module.css";

const Employee = () => {
  return (
    <div
      className="bg-black"
      style={{ backgroundColor: "black", display: "flex" }}
    >
      <Sidebar />
      <div style={{ width: "88vw" }} className="w-[80vw]">
        <p className="text-red-400 text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
          deleniti, eos voluptas obcaecati officiis ipsa voluptatibus tempora
          natus assumenda atque. Quos odit provident quo id ut laborum labore
          esse, tempora, earum enim sapiente eveniet quis iure laudantium
          voluptatem illo voluptates?
        </p>
      </div>
    </div>
  );
};

export default Employee;
