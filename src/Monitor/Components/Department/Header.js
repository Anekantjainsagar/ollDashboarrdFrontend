import React, { useContext } from "react";
import styles from "./style.module.css";
import { CSVLink } from "react-csv";
import B2BContext from "../../Context/B2BContext";
import AddModal from "./Modal";

const Header = ({ search, setSearch }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const context = useContext(B2BContext);
  return (
    <>
      <AddModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className={styles.head}>
        <h1>Department</h1>
        <input
          type="search"
          placeholder="Search here..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className={styles.rsection}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Add Department
          </button>
          <CSVLink
            data={context?.department?.departments}
            filename="Department"
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
