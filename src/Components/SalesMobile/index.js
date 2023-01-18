import React, { useState } from "react";
import { useContext } from "react";
import StudentsContext from "../Context/StudentsContext";
import styles from "./style.module.css";

const SalesMobile = ({ sales }) => {
  const [user, setUser] = useState({
    school: "",
    searchSchool: "",
    schoolLocation: { x: "", y: "" },
    dataSaved: false,
    phone: "",
    age: "",
    name: "",
    email: "",
    course: "",
    source: "",
    sourceInput: "",
    mode: "",
    type: "",
    address: "",
    price: "",
    days: [],
    startDate: "",
    time: "",
    sessionCount: "",
    stage: "🔥 hot",
    status: "new",
    assignee: sales?.name,
    totalPrice: "",
  });
  const apiData = useContext(StudentsContext);
  return (
    <div className={styles.main}>
      <input
        type="text"
        placeholder="Name"
        value={user.searchSchool}
        disabled={user?.dataSaved}
        onChange={(e) => {
          setUser({
            ...user,
            searchSchool: e.target.value,
          });
        }}
        onClick={(e) => {
          setUser({
            ...user,
            schoolLocation: { x: e.clientX, y: e.clientY },
          });
        }}
      />
      <div
        style={
          user?.searchSchool?.length > 0 && user?.dataSaved === false
            ? { display: "block", top: `${user?.schoolLocation.y + 20}px` }
            : { display: "none" }
        }
        className={styles.selectSchool}
      >
        {apiData?.data
          ?.filter((data) =>
            data.name.toLowerCase().includes(user?.searchSchool.toLowerCase())
          )
          .map((e, i) => {
            return (
              <div
                onClick={() => {
                  setUser({
                    ...user,
                    name: e.name,
                    phone: e.mobile,
                    email: e.email,
                    dataSaved: true,
                    school: e.institute_name,
                    searchData: "",
                  });
                  if (e.date_of_birth !== null) {
                    const age =
                      parseInt(new Date(Date.now).toString().slice(12, 16)) -
                      e.date_of_birth.getYear();
                    setUser({ ...user, age });
                  }
                }}
                key={i}
              >
                <p style={{ paddingBottom: "0.25rem" }}>{e.name}</p>
                <p>{e.mobile}</p>
              </div>
            );
          })}
      </div>
      <input
        type="text"
        placeholder="Course"
        value={user.course}
        onChange={(e) => setUser({ ...user, course: e.target.value })}
      />
      <input type="text" />
      <select
        name=""
        id=""
        value={user?.source}
        style={{
          backgroundColor: "#333",
          border: 0,
          padding: "0.5rem 1rem",
          textAlign: "center",
        }}
        onChange={(e) => {
          setUser({ ...user, source: e.target.value });
        }}
      >
        <option value="Source" selected disabled>
          Source
        </option>
        <option value="Event">Event</option>
        <option value="Email">Email</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Referral">Referral</option>
        <option value="Word of Mouth">Word of Mouth</option>
        <option value="Digital">Digital</option>
        <option value="Other">Other</option>
      </select>
      {user?.source === "Other" ? (
        <input
          type="text"
          placeholder="Source"
          value={user?.sourceInput}
          onChange={(e) => {
            setUser({ ...user, sourceInput: e.target.value });
          }}
        />
      ) : null}
      <button>Add Lead</button>
    </div>
  );
};

export default SalesMobile;
