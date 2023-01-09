import axios from "axios";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styles from "../style.module.css";
import TRAINING_URL from "../../../../utils";

const User = ({ data, getApplicants }) => {
  const [reason, setReason] = useState("");
  const [showRejection, setShowRejection] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [payment, setPayment] = useState({ level: "1", amount: "" });
  const [contract, setContract] = useState("Signed");
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
        <p
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            window.open(`https://meet.new/`, "_blank", "noopener,noreferrer");
          }}
        >
          Link
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
            width: "100%",
            paddingLeft: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>Level</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "75%",
            }}
          >
            <select
              style={{
                width: "50%",
                textAlign: "center",
                margin: "0.5rem 0",
              }}
              value={payment?.level}
              onChange={(e) => {
                if (e.target.value == "1") {
                  setPayment({ amount: "400", level: e.target.value });
                }
                if (e.target.value == "2") {
                  setPayment({ amount: "700", level: e.target.value });
                }
                if (e.target.value == "3") {
                  setPayment({ amount: "1000", level: e.target.value });
                }
                if (e.target.value == "4") {
                  setPayment({ amount: "1500", level: e.target.value });
                }
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <p
              style={{
                width: "40%",
                textAlign: "center",
              }}
            >
              Rs. {payment?.amount ? payment?.amount : 0}
            </p>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "2rem",
          }}
        >
          <p>Contract</p>
          <select
            value={contract}
            style={{ width: "65%", marginRight: "2rem" }}
            onChange={(e) => setContract(e.target.value)}
          >
            <option value="Signed">Signed</option>
            <option value="UnSigned">UnSigned</option>
          </select>
        </div>
        <button
          style={{
            textAlign: "center",
            padding: "0.3rem 1.25rem",
          }}
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
