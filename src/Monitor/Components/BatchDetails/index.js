import React, { useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";

function useOutsideAlerter(ref, show, setShow) {
  useEffect(() => {
    if (show) {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, show, setShow]);
}

const BatchDetails = ({ details, setDetails, height, user, setUser }) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, details, setDetails);

  return (
    <div
      ref={ref}
      className={styles.detailsBtnContainer}
      style={
        details === true
          ? { display: "block", top: `${height + 30}px` }
          : { display: "none" }
      }
    >
      <div className={styles.header}>
        <p>Batch Detail</p>
        <AiOutlineClose
          size={18}
          color="white"
          onClick={() => setDetails(!details)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.selectModes}>
        <div
          className={styles.selectMode}
          name="model"
          value={user.model}
          onChange={(e) => setUser({ ...user, model: e.target.value })}
        >
          <h1>Model</h1>
          <div>
            <input type={"radio"} name="model" value={"Comp"} />
            <p>Comp</p>
          </div>
          <div>
            <input type={"radio"} name="model" value={"Optional"} />
            <p>Optional</p>
          </div>
          <div>
            <input type={"radio"} name="model" value={"Full"} />
            <p>Full (sel) </p>
          </div>
        </div>
        <div
          className={styles.selectMode}
          name="payment"
          value={user.payment}
          onChange={(e) => setUser({ ...user, payment: e.target.value })}
        >
          <h1>Payment</h1>
          <div>
            <input type={"radio"} name="payment" value={"viaSchool"} />
            <p>Via School</p>
          </div>
          <div>
            <input type={"radio"} name="payment" value={"viaOnline"} />
            <p>Via Onl.</p>
          </div>
          <div>
            <input type={"radio"} name="payment" value={"viaCash"} />
            <p>Via Cash</p>
          </div>
          <div>
            <input type={"radio"} name="payment" value={"viaCheque"} />
            <p>Via Cheque</p>
          </div>
        </div>
      </div>
      <div className={styles.selectModes}>
        <div
          className={styles.selectMode}
          name="mode"
          value={user.mode}
          onChange={(e) => setUser({ ...user, mode: e.target.value })}
        >
          <h1>Mode</h1>
          <div>
            <input type={"radio"} name="mode" value={"Online"} />
            <p>Online</p>
          </div>
          <div>
            <input type={"radio"} name="mode" value={"Offline"} />
            <p>Offline</p>
          </div>
          <div>
            <input type={"radio"} name="mode" value={"Hybrid"} />
            <p>Hybrid </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
