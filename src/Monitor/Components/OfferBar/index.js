import React, { useState } from "react";
import styles from "./style.module.css";
import ShowOffer from "../ShowOffer/index";

const OfferBar = ({ offer }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

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
        <p className={styles.actions}>Actions</p>
      </div>
    </>
  );
};

export default OfferBar;
