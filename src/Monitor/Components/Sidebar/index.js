import React, { useContext } from "react";
import styles from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import B2BContext from "../../Context/B2BContext";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

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
              !b2b?.dropDown
                ? `${styles.option}, ${styles.optionSelected}`
                : `${styles.option}`
            }
            onClick={(e) => {
              e.preventDefault();
              b2b?.setDropDown(!b2b?.dropDown);
              history("/hr/employees");
            }}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Hr
            {b2b?.dropDown ? (
              <AiFillCaretDown style={{ paddingLeft: "0.5rem" }} size={20} />
            ) : (
              <AiFillCaretUp style={{ paddingLeft: "0.5rem" }} size={20} />
            )}
          </div>
          {!b2b?.dropDown ? (
            <div
              style={{
                backgroundColor: "rgba(150,150,150,0.1)",
                borderRadius: "0.5rem",
                padding: "0.25rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                className={
                  location?.pathname.includes("/hr/employees")
                    ? `${styles.option}, ${styles.optionSelected}`
                    : `${styles.option}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  history("/hr/employees");
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
                onClick={(e) => {
                  e.preventDefault();
                  history("/hr/attendance");
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
                onClick={(e) => {
                  e.preventDefault();
                  history("/hr/holiday");
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
                }}
              >
                Department
              </div>
            </div>
          ) : null}
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
