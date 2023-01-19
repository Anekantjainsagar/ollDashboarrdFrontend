import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import StudentsContext from "../Context/StudentsContext";
import BatchDetails from "./BatchDetails";
import styles from "./style.module.css";
import BASE_URL from "../../Utils/index";

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
    mode: "none",
    type: "none",
    address: "",
    price: "",
    days: [],
    startDate: "",
    sTime: "",
    sessionCount: "",
    stage: "🔥 hot",
    status: "new",
    assignee: sales?.name,
    totalPrice: "",
  });
  const [eTime, setETime] = useState("");
  const [details, setDetails] = useState(false);
  const apiData = useContext(StudentsContext);

  const postData = async () => {
    await axios
      .post(`${BASE_URL}/addUser`, {
        name: user?.name,
        phone: parseInt(user?.phone),
        email: user?.email,
        age: parseInt(user?.age),
        school: user?.school,
        course: user?.course,
        source: user?.source,
        mode: user?.mode,
        type: user?.type,
        address: user?.address,
        price: parseInt(user?.price),
        days: user?.days,
        startDate: user?.startDate,
        time: user?.sTime + " " + eTime,
        sessionsCount: user?.sessionCount,
        stage: "🔥 hot",
        status: "new",
        assignee: sales?.name,
        totalPrice: user?.totalPrice,
      })
      .then((res) => {
        if (res.status === 500) {
          alert("Internal server error");
        }

        if (res.data.message === "User Saved Successfully") {
          setUser({
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
            mode: "none",
            type: "none",
            address: "",
            price: "",
            days: [],
            startDate: "",
            sTime: "",
            sessionCount: "",
            stage: "🔥 hot",
            status: "new",
            assignee: sales?.name,
            totalPrice: "",
          });
          setETime("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.main}>
      <input
        type="text"
        placeholder="Name"
        value={user?.name?.length > 0 ? user?.name : user?.searchSchool}
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
            ? { display: "block", top: `${user?.schoolLocation.y + 25}px` }
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
      <div
        className={styles.btn}
        onClick={(e) => {
          e.preventDefault();
          setDetails(!details);
        }}
      >
        Batch Details
      </div>
      <BatchDetails
        user={user}
        setUser={setUser}
        details={details}
        setDetails={setDetails}
        setETime={setETime}
        eTime={eTime}
      />
      <select
        name=""
        id=""
        required={true}
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
      <button
        onClick={(e) => {
          e.preventDefault();
          postData();
        }}
      >
        Add Lead
      </button>
    </div>
  );
};

export default SalesMobile;
