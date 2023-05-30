import React, { useState } from "react";
import styles from "./style.module.css";
import ShowOffer from "../ShowOffer/index";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";

const OfferBar = ({ offer, getOffers }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const [status, setStatus] = useState(offer?.status);

  return (
    <>
      <ShowOffer
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        offers={offer}
      />
      <div
        className={styles.headings}
        onClick={() => setIsOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <p className={styles.checkBox} onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" />
        </p>
        <p className={styles.course}>{offer.name}</p>
        <p className={styles.typeDrop}>Type</p>
        <p className={styles.duration}>{offer.duration}</p>
        <p className={styles.type}>Type</p>
        <p className={styles.resources}>Resources</p>
        <p className={styles.actions}>
          <select
            name="status"
            id=""
            value={status}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setStatus(e.target.value);
              axios
                .put(`${MONITOR_BACKEND}/updateOfferStatus`, {
                  id: offer._id,
                  status: e.target.value,
                })
                .then((res) => {
                  console.log(res);
                  getOffers();
                });
            }}
          >
            <option value="UnApproved">UnApproved</option>
            <option value="Approved">Approved</option>
          </select>
        </p>
      </div>
    </>
  );
};

export default OfferBar;
