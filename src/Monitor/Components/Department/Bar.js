import React, { useContext } from "react";
import styles from "./style.module.css";
import B2BContext from "../../Context/B2BContext";

const Bar = ({ data, i }) => {
  const context = useContext(B2BContext);
  return (
    <div className={styles.barH}>
      <p>{i + 1}</p>
      <p>{data?.name}</p>
      <p>{data?.parent}</p>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            context?.department.deleteDepartment({ id: data?._id });
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Bar;
