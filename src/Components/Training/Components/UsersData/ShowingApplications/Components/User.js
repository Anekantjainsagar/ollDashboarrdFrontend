import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styles from "../style.module.css";

const User = ({ data }) => {
  return (
    <div className={styles.user}>
      <p>{data?.name}</p>
      <p>{data?.phone}</p>
      <p>{data?.email}</p>
      <p>{data?.location}</p>
      <p
        style={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={() => {
          window.open(
            `http://${data?.workProfileLink}`,
            "_blank",
            "noopener,noreferrer"
          );
        }}
      >
        Resume
      </p>
      <p>{new Date(data?.date).toString().slice(4, 16) + " " + data?.time}</p>
      <p className={styles.actions}>
        <button className={styles.right}>
          <AiOutlineCheck size={22} />
        </button>
        <button className={styles.wrong}>
          <AiOutlineClose size={22} />
        </button>
      </p>
    </div>
  );
};

export default User;
