import React, { useContext } from "react";
import styles from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import B2BContext from "../../Context/B2BContext";

const Sidebar = () => {
  const location = useLocation();
  const history = useNavigate();
  const b2b = useContext(B2BContext);

  return (
    <div className={styles.Sidebar}>
      <div
        className={styles.optionSelected}
        style={{ fontWeight: 900, textAlign: "center" }}
      >
        {b2b?.login?.name === "Vidushi"
          ? "MASTER PANEL"
          : `${b2b?.login?.name}'s PANEL`}
      </div>
      <div
        className={
          location?.pathname === "/b2b"
            ? `${styles.option}, ${styles.optionSelected}`
            : `${styles.option}`
        }
        onClick={() => history("/b2b")}
      >
        Dashboard
      </div>
      <div
        className={
          location?.pathname === "/agents"
            ? `${styles.option}, ${styles.optionSelected}`
            : `${styles.option}`
        }
        onClick={() => history("/agents")}
      >
        Agents
      </div>
      <div
        className={
          location?.pathname === "/db"
            ? `${styles.option}, ${styles.optionSelected}`
            : `${styles.option}`
        }
        onClick={() => history("/db")}
      >
        Database
      </div>
      <div
        className={
          location?.pathname === "/programs"
            ? `${styles.option}, ${styles.optionSelected}`
            : `${styles.option}`
        }
        onClick={() => history("/programs")}
      >
        Programs
      </div>
      <div
        className={
          location?.pathname === "/offers"
            ? `${styles.option}, ${styles.optionSelected}`
            : `${styles.option}`
        }
        onClick={() => history("/offers")}
      >
        Offers
      </div>
      <div
        className={
          location?.pathname === "/"
            ? `${styles.option}, ${styles.optionSelected}`
            : `${styles.option}`
        }
        onClick={() => history("/")}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
