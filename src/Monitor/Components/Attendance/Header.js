import React, { useContext } from "react";
import styles from "./style.module.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { MdFlight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { VscDash } from "react-icons/vsc";
import B2BContext from "../../Context/B2BContext";

const Header = () => {
  const context = useContext(B2BContext);
  return (
    <div className={styles.head}>
      <h1>Attendance</h1>
      <input
        type="search"
        placeholder="Search here..."
        value={context.employee.empSearch}
        onChange={(e) => {
          context.employee.setEmpSearch(e.target.value);
        }}
      />
      <div className={styles.rsection}>
        <button>Add Attendance</button>
        <button>Export</button>
        <div style={{ display: "flex" }}>
          <p style={{ padding: "0 0.6rem", cursor: "pointer" }} title="Holiday">
            <FaStar size={20} />
          </p>
          <p
            style={{ padding: "0 0.6rem", cursor: "pointer" }}
            title="Half Day"
          >
            <FaStarHalfAlt size={20} />
          </p>
          <p style={{ padding: "0 0.6rem", cursor: "pointer" }} title="Absent">
            <AiOutlineClose size={20} />
          </p>
          <p
            style={{ padding: "0 0.6rem", cursor: "pointer" }}
            title="On Leave"
          >
            <MdFlight size={20} />
          </p>
          <p style={{ padding: "0 0.6rem", cursor: "pointer" }} title="Present">
            <TiTick size={22} />
          </p>
          <p style={{ padding: "0 0.6rem", cursor: "pointer" }} title="None">
            <VscDash size={22} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
