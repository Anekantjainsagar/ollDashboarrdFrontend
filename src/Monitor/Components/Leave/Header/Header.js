import React, { useContext } from "react";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";
import AddModal from "./Modal";
import { CSVLink } from "react-csv";

const Header = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const context = useContext(B2BContext);
  return (
    <>
      <AddModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className={styles.head}>
        <h1>Leaves</h1>
        <input
          type="search"
          placeholder="Search here..."
          value={context?.leave?.leaveSearch}
          onChange={(e) => {
            context?.leave?.setLeaveSearch(e.target.value);
          }}
        />
        <div className={styles.rsection}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Add Leave
          </button>
          <CSVLink
            data={context?.leave?.leaves}
            filename="Leaves"
            className={styles.btns}
          >
            Export
          </CSVLink>
        </div>
      </div>
    </>
  );
};

export default Header;
