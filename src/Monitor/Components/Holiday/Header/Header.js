import React, { useContext } from "react";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";
import { CSVLink } from "react-csv";
import AddModal from "./Modal/index";

const Header = ({ search, setSearch }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const context = useContext(B2BContext);
  return (
    <>
      <AddModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className={styles.head}>
        <h1>Holiday</h1>
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
            Add New Holiday
          </button>
          <CSVLink
            data={context?.holiday?.holidays}
            filename="Holidays"
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
