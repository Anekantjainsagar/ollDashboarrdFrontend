import React, { useState } from "react";
import styles from "./style.module.css";

const AddLead = () => {
  const [sourceInput, setSourceInput] = useState("");
  const [user, setUser] = useState({
    schoolName: "",
    offer: "",
    source: "",
    handler: "",
    mode: "",
    model: "",
    payment: "",
  });
  return (
    <div className={styles.add}>
      <input type="text" placeholder="School" />
      <input type="text" placeholder="Offer" />
      <select
        name=""
        id=""
        value={user.source}
        style={{
          backgroundColor: "#333",
          width: "100%",
          border: 0,
          padding: "0.5rem 0",
          textAlign: "center",
          fontSize: "1.8rem",
        }}
        onChange={(e) => {
          setUser({ ...user, source: e.target.value });
        }}
      >
        <option value="Source" selected disabled>
          Source
        </option>
        <option value="Event">Event</option>
        <option value="Email">Email</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Referral">Referral</option>
        <option value="Word of Mouth">Word of Mouth</option>
        <option value="Digital">Digital</option>
        <option value="Other">Other</option>
      </select>
      {user.source === "Other" ? (
        <input
          type="text"
          placeholder="Source"
          value={sourceInput}
          onChange={(e) => {
            setSourceInput(e.target.value);
          }}
        />
      ) : null}
      <input type="text" placeholder="Handler" />
    </div>
  );
};

export default AddLead;
