import React, { useContext } from "react";
import styles from "./style.module.css";
import B2BContext from "../../Context/B2BContext";

const Bar = ({ data, i }) => {
  const context = useContext(B2BContext);
  return (
    <div className={styles.barH}>
      <p>{i + 1}</p>
      <p>{data?.employeeName}</p>
      <p>{data?.awardName}</p>
      <p>{new Date(data.given).toString().slice(4, 21)}</p>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            context?.appreciation.deleteAppreciations({ id: data?._id });
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Bar;
