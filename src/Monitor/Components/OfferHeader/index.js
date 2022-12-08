import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import AddOffer from "../AddOffer/index";

const OfferHeader = ({getOffers}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <AddOffer
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        getOffers={getOffers}
        // getSchools={getSchools}
      />
      <div className={styles.head}>
        <h1>Offers</h1>
        <div className={styles.rSection}>
          <button onClick={() => setIsOpen(true)}>Add New</button>
        </div>
      </div>
    </>
  );
};

export default OfferHeader;
