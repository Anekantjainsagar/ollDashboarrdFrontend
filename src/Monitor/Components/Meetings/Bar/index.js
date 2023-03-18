import React from "react";
import { FiLink } from "react-icons/fi";
import styles from "../style.module.css";

const Bar = ({ meet }) => {
  return (
    <>
      {meet ? (
        <div className={styles.bar}>
          <div className={styles.barStyle}>
            <p className={styles.time}>{meet?.time ? meet.time : "--"}</p>
            <p className={styles.time}>
              {meet?.startDate
                ? new Date(meet.startDate).toString().slice(4, 16)
                : "--"}
            </p>
            <p className={styles.title}>{meet?.name + " " + meet?.type}</p>
            <div className={styles.btnBox}>
              <a
                style={{
                  padding: "0.5rem 1rem",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  backgroundColor: "rgba(0, 165, 16, 1)",
                  borderRadius: "1rem",
                }}
                href={`tel:${meet?.phone}`}
              >
                Contact
              </a>
              <button>
                Share{" "}
                <FiLink
                  color="white"
                  style={{ marginLeft: "0.5rem" }}
                  size={16}
                />
              </button>
              <button
                onClick={() => {
                  if (meet.link?.length > 0) {
                    window.open(meet.link);
                  }
                  window.open("https://meet.google.com/");
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: "2rem", textAlign: "center" }}>No meetings</div>
      )}
    </>
  );
};

export default Bar;
