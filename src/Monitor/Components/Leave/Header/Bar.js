import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import B2BContext from "../../../Context/B2BContext";
import axios from "axios";
const uri = "https://crm.oll.co/api/hr";

const Bar = ({ data }) => {
  const context = useContext(B2BContext);
  const [status, setStatus] = useState(data?.paid);
  const [role, setRole] = useState(data?.leaveStatus);
  return (
    <div className={styles.barH}>
      <p>Emp - {data?.id}</p>
      <p>{data?.name}</p>
      <p>{new Date(data?.leaveDate).toString().slice(4, 21)}</p>
      <p>
        <select
          name="role"
          value={role}
          onChange={(e) => {
            axios
              .put(`${uri}/setLeaveStatus`, {
                id: data._id,
                leaveStatus: e.target.value,
              })
              .then((res) => {
                context.leave.getLeaves();
              })
              .catch((err) => {
                console.log(err);
              });
            setRole(e.target.value);
          }}
        >
          {["Approved", "Rejected"].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p>
        <select
          name="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            context?.leave.setIsPaid({ id: data?._id, paid: e.target.value });
          }}
        >
          {["Yes", "No"].map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
      </p>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            context?.leave.deleteLeave({ id: data?._id });
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};

export default Bar;
