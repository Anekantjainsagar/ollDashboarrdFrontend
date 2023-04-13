import React, { useContext } from "react";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

const Bar = ({ data, i }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const context = useContext(B2BContext);
  return (
    <div className={styles.barH}>
      <p>{i + 1}</p>
      <p>{new Date(data?.date).toString().slice(0, 21)}</p>
      <p>{data?.occasion}</p>
      <p>{days[new Date(data?.date).getDay() - 1]}</p>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            context?.holiday.deleteHoliday({ id: data?._id });
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Bar;
