import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./form.module.css";

const OnboardingForm = () => {
  const api = "https://crm.oll.co/api/training";
  const [requirement, setRequirement] = useState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    whereFind: "",
    refrence: "",
    preferredTime: "",
    preferredDate: "",
    link: "",
  });

  const { innerWidth } = window;

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    axios.get(`${api}/getRequirements`).then((res) => {
      const data = res.data.find((e) => e._id === id);
      setRequirement(data);
    });
  }, [id]);

  return (
    <div className={styles.form}>
      <h1>We are hiring for {requirement?.course} Educators</h1>
      <h6>
        Only {requirement?.openings}{" "}
        {requirement?.openings === 1
          ? "opportunity left"
          : "opportunities are available"}
      </h6>
      <input
        type="text"
        value={form.name}
        placeholder="Enter your name"
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
        }}
      />
      <input
        type="text"
        value={form.email}
        placeholder="Enter your email"
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }}
      />
      <input
        type="text"
        value={form.phone}
        placeholder="Enter your phone"
        onChange={(e) => {
          setForm({ ...form, phone: e.target.value });
        }}
      />
      <input
        type="text"
        value={form.location}
        placeholder="Enter your location"
        onChange={(e) => {
          setForm({ ...form, location: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Enter your work experience"
        value={form.experience}
        onChange={(e) => {
          setForm({ ...form, experience: e.target.value });
        }}
      />
      <input
        type="text"
        value={form.whereFind}
        placeholder="Where you find us?"
        onChange={(e) => {
          setForm({ ...form, whereFind: e.target.value });
        }}
      />
      <input
        type="text"
        value={form.refrence}
        placeholder="Refence name ( If you have )"
        onChange={(e) => {
          setForm({ ...form, refrence: e.target.value });
        }}
      />
      <input
        type="link"
        placeholder="Your work profile"
        value={form.link}
        onChange={(e) => {
          setForm({ ...form, link: e.target.value });
        }}
      />
      <p>Preffered Interview Date and Time :</p>
      <div>
        <input
          type="date"
          value={form.preferredDate}
          style={innerWidth < 550 ? { width: "47%" } : { width: "45%" }}
          placeholder="Preffered date"
          onChange={(e) => {
            setForm({ ...form, preferredDate: e.target.value });
          }}
        />
        <input
          type="time"
          value={form.preferredTime}
          placeholder="Preffered time"
          style={innerWidth < 550 ? { width: "47%" } : { width: "45%" }}
          onChange={(e) => {
            setForm({ ...form, preferredTime: e.target.value });
          }}
        />
      </div>
      <button>Apply for position</button>
    </div>
  );
};

export default OnboardingForm;
