import React from "react";
import styles from "../style.module.css";

const User = ({ data }) => {
  console.log(data)
  return (
    <div className={styles.user}>
      <p>{data?.name}</p>
      <p>{data?.phone}</p>
      <p>{data?.email}</p>
      <p>{data?.location}</p>
      <p
        style={{ textDecoration: "underline" }}
        onClick={(e) => {
          window.open(data?.resume);
        }}
      >
        Resume
      </p>
      <p>Interview</p>
      <p>Actions</p>
    </div>
  );
};

export default User;
