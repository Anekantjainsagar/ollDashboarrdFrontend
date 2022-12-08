import React from "react";
import styles from "./style.module.css";
import { AiOutlineFilter } from "react-icons/ai";
import array from "../../Screens/Database/array";

const DbUserHeading = ({ dbFilters, setDbFilters, school, AllSchools }) => {
  const board = AllSchools.map((e) => {
    return e.board;
  });
  const types = AllSchools.map((e) => {
    return e.type;
  });

  return (
    <div className={styles.headings}>
      <p className={styles.checkBox}>
        <input
          type="checkbox"
          onChange={(e) => {
            if (array.includes("all")) {
              const index = array.indexOf("all");
              array.splice(index, 1);
            } else {
              array.push("all");
            }
          }}
        />
        <p style={{ fontSize: "1.15rem" }}>All</p>
      </p>
      <p>S. No.</p>
      <p className={styles.school}>
        <input
          type="text"
          placeholder="School"
          value={dbFilters.name}
          onChange={(e) => setDbFilters({ ...dbFilters, name: e.target.value })}
        />
      </p>
      <p
        className={styles.type}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "1.5rem",
        }}
      >
        Type
        <AiOutlineFilter
          style={{ marginLeft: "0.5rem" }}
          size={20}
          className={styles.icon}
        />
        <select
          className={styles.filterSelector}
          value={dbFilters.type}
          onChange={(e) => {
            setDbFilters({ ...dbFilters, type: e.target.value });
          }}
        >
          {["All", ...new Set(types)].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p
        className={styles.board}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "1.5rem",
        }}
      >
        Board
        <AiOutlineFilter
          style={{ marginLeft: "0.5rem" }}
          size={20}
          className={styles.icon}
        />
        <select
          className={styles.filterSelector}
          value={dbFilters.board}
          onChange={(e) => {
            setDbFilters({ ...dbFilters, board: e.target.value });
          }}
        >
          {["All", ...new Set(board)].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p className={styles.location}>
        <input
          type="text"
          placeholder="Location"
          value={dbFilters.location}
          onChange={(e) =>
            setDbFilters({ ...dbFilters, location: e.target.value })
          }
        />
      </p>
      <p className={styles.principal}>
        <input
          type="text"
          placeholder="Principal"
          value={dbFilters.principal}
          onChange={(e) =>
            setDbFilters({ ...dbFilters, principal: e.target.value })
          }
        />
      </p>
      <p className={styles.trustee}>
        <input
          type="text"
          placeholder="Trustee"
          value={dbFilters.trustee}
          onChange={(e) =>
            setDbFilters({ ...dbFilters, trustee: e.target.value })
          }
        />
      </p>
      <p className={styles.coordinator}>
        <input
          type="text"
          placeholder="Coordinator"
          value={dbFilters.coordinator}
          onChange={(e) =>
            setDbFilters({ ...dbFilters, coordinator: e.target.value })
          }
        />
      </p>
    </div>
  );
};

export default DbUserHeading;
