import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import SchoolModal from "../SchoolModal/index";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils/index";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import B2BContext from "../../Context/B2BContext";

const NewLead = ({ schools, getSchools, getUsers, agents, offers }) => {
  const history = useNavigate();
  const location = useLocation();
  const b2b = useContext(B2BContext);
  const [user, setUser] = useState({
    schoolName: "",
    offer: "",
    source: "",
    handler: "",
    mode: "",
    model: "",
    payment: "",
    description: "",
    deadline: new Date().toISOString().split("T")[0],
  });
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [selectSchool, setSelectSchool] = useState();
  const [schoolLocation, setSchoolLocation] = useState({ x: "", y: "" });
  const [schoolSaved, setSchoolSaved] = useState(false);
  const [selectHandler, setselectHandler] = useState();
  const [handlerLocation, sethandlerLocation] = useState({ x: "", y: "" });
  const [handlerSaved, sethandlerSaved] = useState(false);
  const [schoolId, setSchoolId] = useState();
  const [sourceInput, setSourceInput] = useState("");
  const [selectOffer, setselectOffer] = useState();
  const [offerLocation, setofferLocation] = useState({ x: "", y: "" });
  const [offerSaved, setofferSaved] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [schoolKaId, setSchoolKaId] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  useEffect(() => {
    if (location.pathname.includes("b2b")) {
      if (b2b?.login?.name !== "Vidushi") {
        const agent = agents.find((e) =>
          e?.name?.toLowerCase().includes(b2b?.login?.name.toLowerCase())
        );
        if (agent?.name?.length > 0) {
          setUser({ ...user, handler: agent?.name });
        }
      }
    }
  }, [location.pathname]);

  function openModal() {
    setIsOpen(true);
  }

  const addUser = () => {
    if (selectSchool?.length > 0) {
      axios
        .post(`${MONITOR_BACKEND}/addUser`, {
          ...user,
          source: user.source === "Other" ? sourceInput : user.source,
          phone,
          status: "New",
          schoolId: schoolId,
          schoolKaId: schoolKaId,
        })
        .then((res) => {
          getUsers();
          setUser({
            schoolName: "",
            offer: "",
            source: "",
            handler: "",
            mode: "",
            model: "",
            payment: "",
            description: "",
          });
          setPhone("");
          setselectHandler("");
          setselectOffer("");
          setSchoolId("");
          setSelectSchool("");
          sethandlerSaved(false);
          setSchoolSaved(false);
          setofferSaved(false);
          console.log(res);
          // const options = {
          //   method: "POST",
          //   headers: {
          //     "content-type": "text/json",
          //     Authorization:
          //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzIyYzViYi1kYzQwLTRmODctYjZiMi1iMjMyOTQyMjBiOGUiLCJ1bmlxdWVfbmFtZSI6ImluZm9Ab2xsLmNvIiwibmFtZWlkIjoiaW5mb0BvbGwuY28iLCJlbWFpbCI6ImluZm9Ab2xsLmNvIiwiYXV0aF90aW1lIjoiMDgvMDEvMjAyMiAwNDowMDo1NiIsImRiX25hbWUiOiIxMTUwNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.k89dQ0gkjcZ3T8VYDz6FIbr4sisaSiSTvjLZ7FhLEAc",
          //   },
          //   body: JSON.stringify({
          //     receivers: [
          //       {
          //         customParams: [
          //           { name: "client_name", value: "name" },
          //           { name: "id", value: "id" },
          //           { name: "query_date", value: "d.slice(4, 16)" },
          //           { name: "query_time", value: "d.slice(16, 21)" },
          //           { name: "query_status", value: "e.target.value" },
          //         ],
          //         whatsappNumber: "917692045606",
          //       },
          //       {
          //         customParams: [
          //           { name: "client_name", value: "name" },
          //           { name: "id", value: "id" },
          //           { name: "query_date", value: "d.slice(4, 16)" },
          //           { name: "query_time", value: "d.slice(16, 21)" },
          //           { name: "query_status", value: "e.target.value" },
          //         ],
          //         whatsappNumber: "919699188188",
          //       },
          //     ],
          //     template_name: "query_add_to_ops",
          //     broadcast_name: "alert",
          //   }),
          // };
          // fetch(
          //   "https://live-server-11507.wati.io/api/v1/sendTemplateMessages",
          //   options
          // )
          //   .then((response) => response.json())
          //   .then((response) => console.log(response))
          //   .catch((err) => console.error(err));

          //Sending mail
          if (sendEmail == true) {
            emailjs
              .send(
                "service_2ynwyzb",
                "template_p4hiil9",
                {
                  name: user?.schoolName,
                  from_name: "OLL",
                  email: email,
                },
                "SkxN6CQDdddlQ84Qj"
              )
              .then(
                function (response) {
                  console.log(response);
                  console.log("SUCCESS!", response.status, response.text);
                },
                function (err) {
                  console.log("FAILED...", err);
                }
              );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <SchoolModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        getSchools={getSchools}
      />
      <div className={styles.NewLead}>
        <h3>New Lead</h3>
        <div className={styles.mainInputBox}>
          <input
            type="text"
            placeholder="School"
            disabled={schoolSaved}
            value={user.schoolName?.length > 0 ? user.schoolName : selectSchool}
            onClick={(e) => setSchoolLocation({ x: e.clientX, y: e.clientY })}
            onChange={(e) => {
              setSelectSchool(e.target.value);
            }}
          />
          <div
            style={
              selectSchool?.length > 0 && schoolSaved === false
                ? {
                    display: "block",
                    top: `${schoolLocation.y + 25}px`,
                  }
                : { display: "none" }
            }
            className={styles.selectSchool}
          >
            {schools
              ?.filter((school) =>
                school?.name
                  ?.toLowerCase()
                  .includes(selectSchool?.toLowerCase())
              )
              .map((e, i) => {
                return (
                  <p
                    onClick={() => {
                      setUser({ ...user, schoolName: e?.name });
                      setSchoolId(e?.id);
                      setSchoolKaId(e?._id);
                      setPhone(e.phone);
                      setSchoolSaved(true);
                      setEmail(e?.email);
                    }}
                    key={i}
                  >
                    {e?.name}
                  </p>
                );
              })}

            <button
              className={styles.btn}
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
              onClick={() => setIsOpen(true)}
            >
              Add New
            </button>
          </div>
          <input
            type="text"
            placeholder="Offer"
            disabled={offerSaved}
            value={user.offer?.length > 0 ? user.offer : selectOffer}
            onClick={(e) => setofferLocation({ x: e.clientX, y: e.clientY })}
            onChange={(e) => {
              setselectOffer(e.target.value);
            }}
          />
          <div
            style={
              selectOffer?.length > 0 && offerSaved === false
                ? {
                    display: "block",
                    top: `${offerLocation.y + 25}px`,
                    left: "400px",
                  }
                : { display: "none" }
            }
            className={styles.selectSchool}
          >
            {offers
              ?.filter((offer) =>
                offer?.name?.toLowerCase().includes(selectOffer?.toLowerCase())
              )
              .map((e, i) => {
                return (
                  <p
                    onClick={() => {
                      setUser({ ...user, offer: e?.name });
                      setofferSaved(true);
                    }}
                    key={i}
                  >
                    {e?.name}
                  </p>
                );
              })}

            <button
              className={styles.btn}
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
              onClick={() => history("/offers")}
            >
              Add New
            </button>
          </div>
          {user.source != "Other" ? (
            <select
              name=""
              id=""
              value={user.source}
              style={{
                backgroundColor: "#333",
                width: "15%",
                border: 0,
                padding: "0.5rem 0",
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
          ) : null}
          {user.source === "Other" ? (
            <input
              type="text"
              placeholder="Source"
              value={sourceInput}
              onChange={(e) => {
                setSourceInput(e.target.value);
              }}
            />
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "20%",
            }}
          >
            <p>Deadline : </p>
            <input
              type="date"
              style={{ width: "60%" }}
              placeholder="Deadline"
              value={user.deadline}
              onChange={(e) => {
                setUser({ ...user, deadline: e.target.value });
              }}
            />
          </div>
          <input
            type="text"
            placeholder="Handler"
            value={user.handler?.length > 0 ? user.handler : selectHandler}
            onChange={(e) => {
              setselectHandler(e.target.value);
            }}
            disabled={handlerSaved}
            onClick={(e) => sethandlerLocation({ x: e.clientX, y: e.clientY })}
          />
          <div
            style={
              selectHandler?.length > 0 && handlerSaved === false
                ? {
                    display: "block",
                    top: `${handlerLocation.y + 25}px`,
                    left: "1025px",
                  }
                : { display: "none" }
            }
            className={styles.selectSchool}
          >
            {agents
              ?.filter((agent) =>
                agent?.name
                  ?.toLowerCase()
                  .includes(selectHandler?.toLowerCase())
              )
              .map((e, i) => {
                return (
                  <p
                    onClick={() => {
                      setUser({ ...user, handler: e?.name });
                      sethandlerSaved(true);
                    }}
                    key={i}
                  >
                    {e?.name}
                  </p>
                );
              })}

            <button
              className={styles.btn}
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
              onClick={() => history("/agents")}
            >
              Add New
            </button>
          </div>
          <div
            style={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <p>Send Email</p>
            <input
              type={"checkbox"}
              checked={sendEmail}
              onChange={(e) => {
                setSendEmail(e.target.checked);
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            value={user?.description}
            placeholder={`Enter the task for ${
              user?.handler ? user?.handler : "Handler"
            }`}
            onChange={(e) => {
              setUser({ ...user, description: e.target.value });
            }}
            style={{ width: "80%", marginRight: "1rem" }}
          />
          <button
            className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              addUser();
            }}
          >
            <AiOutlinePlus
              color="white"
              size={16}
              style={{ marginRight: "0.5rem" }}
            />
            Create Lead
          </button>
        </div>
      </div>
    </>
  );
};

export default NewLead;
