import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./form.module.css";
import { css } from "glamor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OnboardingForm = () => {
  const api = "https://crm.oll.co/api/training";
  // const api = "http://localhost:8000/api/training";
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

  const applyNow = () => {
    if (
      form.name.length > 0 &&
      form.email.length > 0 &&
      form.phone.length > 0
    ) {
      axios
        .post(`${api}/applyForEducator`, {
          ...form,
          courseId: requirement?._id,
        })
        .then((res) => {
          console.log(res);
          if (res?.data?._id?.length > 0) {
            setForm({
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
            const notify = () =>
              toast(`Applied for ${requirement?.course} post successfully`, {
                type: "success",
              }).configure({
                bodyClassName: css({
                  backgroundColor: "blue",
                  height: "100%",
                  width: "100%",
                }),
              });
            notify();
          } else {
            const notify = () =>
              toast("Internal sever error", { type: "error" }).configure({
                bodyClassName: css({
                  backgroundColor: "red",
                  height: "100%",
                  width: "100%",
                }),
              });
            notify();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div style={{ position: "absolute" }}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <div className={styles.form}>
        <h1>Urgent requirement for {requirement?.course} Educators</h1>
        <input
          type="text"
          required={true}
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
          required={true}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <input
          type="text"
          value={form.phone}
          placeholder="Enter your phone"
          required={true}
          onChange={(e) => {
            setForm({ ...form, phone: e.target.value });
          }}
        />
        <input
          type="text"
          value={form.location}
          placeholder="Enter your location"
          required={true}
          onChange={(e) => {
            setForm({ ...form, location: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Enter your work experience"
          value={form.experience}
          required={true}
          onChange={(e) => {
            setForm({ ...form, experience: e.target.value });
          }}
        />
        <input
          type="text"
          required={true}
          value={form.whereFind}
          placeholder="Where you find us?"
          onChange={(e) => {
            setForm({ ...form, whereFind: e.target.value });
          }}
        />
        <input
          type="text"
          value={form.refrence}
          placeholder="Refrence name ( If you have )"
          onChange={(e) => {
            setForm({ ...form, refrence: e.target.value });
          }}
        />
        <input
          type="link"
          placeholder="Work profile link"
          required={true}
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
            required={true}
            style={innerWidth < 550 ? { width: "47%" } : { width: "45%" }}
            onChange={(e) => {
              setForm({ ...form, preferredTime: e.target.value });
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            applyNow();
          }}
        >
          Apply for position
        </button>
      </div>
    </>
  );
};

export default OnboardingForm;
