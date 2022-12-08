import React, { useState } from "react";
import styles from "./style.module.css";

import OfferHeader from "../../Components/OfferHeader";
import OfferHeading from "../../Components/OfferHeading";
import OfferBar from "../../Components/OfferBar";
import Sidebar from "../../Components/Sidebar";

const Offers = ({ offers, getOffers }) => {
  const [filter, setFilter] = useState();

  return (
    <>
      <div className={styles.home}>
        <Sidebar />
        <div>
          <OfferHeader getOffers={getOffers} />
          <OfferHeading filter={filter} setFilter={setFilter} />
          <div className={styles.dbDisplay}>
            {offers
              .filter((e) => {
                if (filter?.length > 0) {
                  return e.name.toLowerCase().includes(filter.toLowerCase());
                }
                return e;
              })
              .map((offer, index) => {
                return <OfferBar offer={offer} key={index} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
