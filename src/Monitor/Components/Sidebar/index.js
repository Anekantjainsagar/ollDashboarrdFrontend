import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import B2BContext from "../../Context/B2BContext";

const Sidebar = () => {
  const location = useLocation();
  const history = useNavigate();
  const b2b = useContext(B2BContext);
  const [open, setOpen] = useState(false);

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
      {b2b?.login?.name === "Vidushi" ? (
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
      ) : null}

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
      {b2b?.login?.name === "Vidushi" ? (
        <>
          <div
            className={
              location?.pathname.includes("/hr/employees")
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={() => {
              history("/hr/employees");
              setOpen(!open);
            }}
          >
            Employees
          </div>
          <div
            className={
              location?.pathname.includes("/hr/attendance")
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={() => {
              history("/hr/attendance");
              setOpen(!open);
            }}
          >
            Attendance
          </div>
          <div
            className={
              location?.pathname.includes("/hr/leaves")
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={() => {
              history("/hr/leaves");
              setOpen(!open);
            }}
          >
            Leaves
          </div>
          <div
            className={
              location?.pathname.includes("/hr/holiday")
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={() => {
              history("/hr/holiday");
              setOpen(!open);
            }}
          >
            Holiday
          </div>
          <div
            className={
              location?.pathname.includes("/hr/appreciation")
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={() => {
              history("/hr/appreciation");
              setOpen(!open);
            }}
          >
            Appreciation
          </div>
          <div
            className={
              location?.pathname.includes("/hr/designation")
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={() => {
              history("/hr/designation");
              setOpen(!open);
            }}
          >
            Designation
          </div>
          <div
            className={
              location?.pathname.includes("/hr/department")
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={() => {
              history("/hr/department");
              setOpen(!open);
            }}
          >
            Department
          </div>
        </>
      ) : null}
      <div
        className={
          location?.pathname === "/"
            ? `${styles.option}, ${styles.optionSelected}`
            : `${styles.option}`
        }
        onClick={() => {
          localStorage.removeItem("token");
          b2b.setLogin({});
          history("/");
          console.log(b2b.login);
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
