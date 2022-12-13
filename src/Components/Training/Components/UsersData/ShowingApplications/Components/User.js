import axios from "axios";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styles from "../style.module.css";
import TRAINING_URL from "../../../../utils";

const User = ({ data, getApplicants }) => {
  const [reason, setReason] = useState("");
  const [showRejection, setShowRejection] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [payment, setPayment] = useState({ level: "", amount: "" });
  const [contract, setContract] = useState("");
  return (
    <>
      <div className={styles.user}>
        <p>{data?.name}</p>
        <p>{data?.phone}</p>
        <p>{data?.email}</p>
        <p>{data?.location}</p>
        <p
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            window.open(
              `${
                data?.workProfileLink.includes("https://") === true
                  ? data?.workProfileLink
                  : `https://${data?.workProfileLink}`
              }`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          Resume
        </p>
        <p>{new Date(data?.date).toString().slice(4, 16) + " " + data?.time}</p>
        <p className={styles.actions}>
          <button
            className={styles.right}
            onClick={(e) => {
              e.preventDefault();
              if (data?.status === "Applicants") {
                axios
                  .put(`${TRAINING_URL}/setToShortlisting`, {
                    id: data?._id,
                  })
                  .then((res) => {
                    console.log(res);
                    getApplicants();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else if (data?.status === "Shortlisted") {
                setShowOnboarding(!showOnboarding);
              }
            }}
          >
            <AiOutlineCheck size={22} />
          </button>
          <button
            className={styles.wrong}
            onClick={(e) => {
              e.preventDefault();
              setShowRejection(!showRejection);
            }}
          >
            <AiOutlineClose size={22} />
          </button>
        </p>
      </div>
      <div
        style={
          showRejection
            ? {
                width: "30%",
                float: "right",
                marginRight: "1rem",
                border: "1px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                borderRadius: "1rem",
              }
            : { display: "none" }
        }
      >
        <input
          type="text"
          style={{ width: "65%" }}
          value={reason}
          placeholder="Enter the reason"
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          style={{ textAlign: "center", padding: "0.3rem 1.25rem" }}
          onClick={(e) => {
            e.preventDefault();
            if (reason.length > 0) {
              axios
                .put(`${TRAINING_URL}/setToRejected`, {
                  id: data?._id,
                  reason,
                })
                .then((res) => {
                  console.log(res);
                  getApplicants();
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        >
          Submit
        </button>
      </div>
      <div
        style={
          showOnboarding
            ? {
                width: "30%",
                float: "right",
                marginRight: "1rem",
                border: "1px solid white",
                borderRadius: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }
            : { display: "none" }
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <input
            type="number"
            style={{ width: "47%" }}
            value={payment?.level}
            placeholder="Enter the level"
            onChange={(e) => setPayment({ ...payment, level: e.target.value })}
          />
          <input
            type="number"
            style={{ width: "47%" }}
            value={payment?.amount}
            placeholder="Amount"
            onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
          />
        </div>
        <input
          type="text"
          style={{ width: "95%" }}
          value={contract}
          placeholder="Signed contract"
          onChange={(e) => setContract(e.target.value)}
        />
        <button
          style={{ textAlign: "center", padding: "0.3rem 1.25rem" }}
          onClick={(e) => {
            e.preventDefault();
            if (
              contract.length > 0 &&
              payment.level > 0 &&
              payment.amount > 0
            ) {
              axios
                .put(`${TRAINING_URL}/setToOnboarded`, {
                  id: data?._id,
                  contract,
                  payment,
                })
                .then((res) => {
                  console.log(res);
                  getApplicants();
                })
                .catch((err) => {
                  console.log(err);
                }); 
            }
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default User;
