import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";

const EmployeeBar = ({ data }) => {
  const [status, setStatus] = useState(data?.status);
  const context = useContext(B2BContext);
  return (
    <div className={styles.bar}>
      <p>Emp - {data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.email}</p>
      <p>{data?.role}</p>
      <p>
        <select
          name="status"
          value={status}
          onChange={(e) => {
            e.preventDefault();
            context.employee.updateStatus({
              details: { status: e.target.value, id: data._id },
            });
            setStatus(e.target.value);
          }}
        >
          {["Active", "Inactive"].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            context.employee.deleteEmployee({ id: data._id });
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default EmployeeBar;
