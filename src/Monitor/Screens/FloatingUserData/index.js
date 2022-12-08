import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  AiOutlineClose,
  AiFillDelete,
  AiOutlineCopy,
  AiOutlineRight,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { ImPhone } from "react-icons/im";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsWhatsapp } from "react-icons/bs";
import "jspdf-autotable";
import "./style.css";
import Axios from "axios";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import AddStatusMeeting from "../../Components/AddStatusMeeting";
import { IoPeopleSharp } from "react-icons/io5";
import fileDownload from "js-file-download";
import AddStatusfollows from "../../Components/AddStatusFollowUp";

function useOutsideAlerter(ref, show, setShow) {
  useEffect(() => {
    if (show) {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, show, setShow]);
}

const FloatingUserData = ({
  showUserData,
  setShowUserData,
  user,
  getFollowUps,
  getPrograms,
  getUsers,
  programs,
  schools,
  getMeetings,
}) => {
  const ref = useRef(null);
  const [statusChange, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [displayComment, setDisplayComment] = useState(true);
  const [cmntDeleteDisplay, setCmntDeleteDisplay] = useState(false);
  const [pricing, setPricing] = useState([]);
  const [schoolfind, setSchoolfind] = useState();
  const [offer, setOffer] = useState({
    name: user?.offer,
    classes: [],
    model: "Model",
    payment: "Payment",
    mode: "Mode",
    terms: "Terms",
    training: "Training",
  });
  const [costing, setCosting] = useState({
    commission: "",
    kitCosting: "",
    partner: "",
    noOfBatches: "",
    educator: "",
    taxes: "",
    other: "",
    total: "",
  });
  const { schoolName, phone, id, status, inqDate, _id, source, comment } = user;

  const [followUpModal, setFollowUpModal] = useState(false);
  function openFollowModal() {
    setFollowUpModal(true);
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  useOutsideAlerter(ref, showUserData, setShowUserData);

  const addNewProgram = () => {
    if (offer.name.length > 0) {
      axios
        .post(`${MONITOR_BACKEND}/addProgram`, {
          ...offer,
          pricing,
          school: user?.schoolName,
          costing,
        })
        .then((response) => {
          const notify = () => {
            toast("Program added Successfully", {
              type: "success",
            });
          };
          if (response?.data) {
            setShowUserData(false);
            notify();
            setOffer({
              name: "",
              classes: [""],
              model: "",
              payment: "",
              mode: "",
              terms: "",
            });
            setPricing([]);
            getPrograms();
            setCosting({
              commission: "",
              kitCosting: "",
              partner: "",
              noOfBatches: "",
              educator: "",
              taxes: "",
              other: "",
              total: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChangePrice = (e) => {
    const newState = pricing.map((element) => {
      return element?.name === e.target.name
        ? { ...element, value: e.target.value }
        : element;
    });
    setPricing([...newState]);
  };

  const onChangeStudents = (e) => {
    const newState = pricing.map((element) => {
      return element?.name === e.target.name
        ? { ...element, students: e.target.value }
        : element;
    });
    setPricing([...newState]);
  };

  const deleteComment = (id) => {
    axios
      .delete(`${MONITOR_BACKEND}/deleteComment`, {
        headers: {
          Authorization: "***",
        },
        data: {
          id: id,
          userId: _id,
        },
      })
      .then((response) => {
        if (response?.data.modifiedCount > 0) {
          getUsers();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const s = schools.find((school) => {
      return school.name.toLowerCase().includes(schoolName.toLowerCase());
    });
    setSchoolfind(s);
  }, []);

  useEffect(() => {
    if (offer.classes?.length > 0) {
      const newState = offer.classes.map((e) => {
        const obj = pricing?.find((element) => element.name === e);
        return obj?.name?.length > 0
          ? { name: obj?.name, value: obj?.value, students: obj?.students }
          : { name: e, value: "", students: "" };
      });
      setPricing([...newState]);
    }
  }, [offer.classes]);

  return (
    <>
      <AddStatusfollows
        modalIsOpen={followUpModal}
        openModal={openFollowModal}
        setIsOpen={setFollowUpModal}
        user={user}
        getFollowUps={getFollowUps}
      />
      <AddStatusMeeting
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
        user={user}
        getMeetings={getMeetings}
      />
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
      <div
        className={
          showUserData === true
            ? `${styles.div} ${styles.animate}`
            : `${styles.div}`
        }
        ref={ref}
      >
        <div className={styles.header}>
          <p className={styles.id}>OLL - {id}</p>
          <select
            value={statusChange.length > 0 ? statusChange : status}
            style={{ width: "50%" }}
            onChange={(e) => {
              setStatus(e.target.value);
              axios
                .put(`${MONITOR_BACKEND}/setStatus`, {
                  id: _id,
                  status: e.target.value,
                })
                .then((response) => {
                  console.log(response);
                  if (response.data.data.modifiedCount > 0) {
                    getUsers();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className={statusChange.length > 0 ? statusChange : status}
          >
            <option
              className={styles.New}
              value="New"
              disabled={status === "FollowUp" || status === "Started"}
            >
              New
            </option>
            <option
              className={styles.FollowUp}
              value="FollowUp"
              disabled={status === "Started"}
            >
              Follow Up
            </option>
            <option className={styles.Started} value="Started">
              Started
            </option>
          </select>
          <AiOutlineClose
            size={20}
            onClick={() => setShowUserData(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <h1 style={{ fontSize: "1.75rem", marginTop: "1rem" }}>{schoolName}</h1>
        <div className={styles.contactContainer}>
          <p>Contact</p>
          <div className={styles.container}>
            <a href={`tel:${phone}`}>
              <ImPhone size={30} color={"white"} className={styles.iconStyle} />
            </a>
            <CopyToClipboard
              text={schoolfind?.email}
              onCopy={() => {
                const notify = () => {
                  toast("Copied successfully", { type: "success" });
                };
                notify();
              }}
            >
              <AiOutlineMail
                size={30}
                color={"white"}
                className={styles.iconStyle}
                onClick={() => {
                  window.open(
                    "https://mail.google.com/mail/u/0/#inbox?compose=new"
                  );
                }}
              />
            </CopyToClipboard>
            <AiOutlineWhatsApp
              size={30}
              color={"white"}
              className={styles.iconStyle}
            />
            <CopyToClipboard
              text={`${schoolfind?.name} ${schoolfind?.email} ${schoolfind?.phone}`}
              onCopy={() => {
                const notify = () => {
                  toast("Copied successfully", { type: "success" });
                };
                notify();
              }}
            >
              <AiOutlineCopy
                size={30}
                color={"white"}
                className={styles.iconStyle}
              />
            </CopyToClipboard>
            <div
              className={styles.btn}
              onClick={() =>
                window.open("https://live-11507.wati.io/teamInbox/")
              }
            >
              <BsWhatsapp
                size={20}
                style={{ marginRight: "0.3rem" }}
                color={"#0ac032"}
              />
              History
            </div>
          </div>
        </div>
        {status === "FollowUp" ? (
          <form
            encType="multipart/form-data"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className={styles.header}>
              <h1>Program Details</h1>
            </div>
            <div className={styles.inputSections}>
              <input
                type="text"
                placeholder="Class Name"
                value={offer.name}
                onChange={(e) => setOffer({ ...offer, name: e.target.value })}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  margin: "0.5rem 0",
                }}
              >
                <select
                  name=""
                  id=""
                  style={{ borderRadius: "1rem", fontWeight: "bold" }}
                  value={offer.model}
                  onChange={(e) =>
                    setOffer({ ...offer, model: e.target.value })
                  }
                >
                  <option value="Model" selected disabled>
                    Model
                  </option>
                  <option value="Compulsory">Compulsory</option>
                  <option value="Optional">Optional</option>
                </select>
                <select
                  name=""
                  id=""
                  style={{ borderRadius: "1rem", fontWeight: "bold" }}
                  value={offer.mode}
                  onChange={(e) => setOffer({ ...offer, mode: e.target.value })}
                >
                  <option value="Mode" selected disabled>
                    Mode
                  </option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <select
                  name=""
                  id=""
                  style={{ borderRadius: "1rem", fontWeight: "bold" }}
                  value={offer.training}
                  onChange={(e) =>
                    setOffer({ ...offer, training: e.target.value })
                  }
                >
                  <option value="Training" selected disabled>
                    Training
                  </option>
                  <option value="ToStudent">To Student</option>
                  <option value="ToTeacher">To Teacher</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "100%",
                  margin: "0.5rem 0",
                }}
              >
                <select
                  name=""
                  id=""
                  style={{ borderRadius: "1rem", fontWeight: "bold" }}
                  value={offer.payment}
                  onChange={(e) =>
                    setOffer({ ...offer, payment: e.target.value })
                  }
                >
                  <option value="Payment" selected disabled>
                    Payment
                  </option>
                  <option value="ViaSchool">Via School</option>
                  <option value="ViaOnline">Via Online</option>
                  <option value="ViaCash">Via Cash</option>
                  <option value="ViaCheque">Via Cheque</option>
                </select>
                <select
                  name=""
                  id=""
                  style={{ borderRadius: "1rem", fontWeight: "bold" }}
                  value={offer.terms}
                  onChange={(e) =>
                    setOffer({ ...offer, terms: e.target.value })
                  }
                >
                  <option value="Terms" selected disabled>
                    Terms
                  </option>
                  <option value="50-25-25">50-25-25</option>
                  <option value="50-0-50">50-0-50</option>
                  <option value="100-0-0">100-0-0</option>
                </select>
              </div>
              <div className={styles.grades}>
                <p>Grades</p>
                <div className={styles.checkBoxes}>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      id=""
                      name="1"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                    />
                    <p>1</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      id=""
                      name="2"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                    />
                    <p>2</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="3"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>3</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="4"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>4</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="5"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>5</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="6"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>6</p>
                  </div>
                </div>
                <div className={styles.checkBoxes}>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="7"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>7</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="8"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>8</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="9"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>9</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="10"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>10</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="11"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>11</p>
                  </div>
                  <div className={styles.inputs}>
                    <input
                      type="checkbox"
                      name="12"
                      onChange={(e) => {
                        if (offer.classes.includes(e.target.name) === false) {
                          setOffer({
                            ...offer,
                            classes: [...offer.classes, e.target.name],
                          });
                        } else {
                          var index = offer.classes.indexOf(e.target.name);
                          var className = [...offer.classes];
                          className.splice(index, 1);
                          setOffer({ ...offer, classes: [...className] });
                        }
                      }}
                      id=""
                    />
                    <p>12</p>
                  </div>
                </div>
              </div>
              <div
                className={styles.pricing}
                style={
                  offer?.classes?.length > 0
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <p>Pricing</p>
                {offer.classes?.length > 0 || !offer.classes.includes("")
                  ? offer.classes?.map((e) => {
                      return (
                        <div
                          className={styles.pricingInputs}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <input
                            type="text"
                            value={e}
                            style={{ width: "15%" }}
                          />
                          <input
                            type="number"
                            placeholder="No. of students"
                            style={{ width: "42%" }}
                            name={e}
                            onChange={(e) => onChangeStudents(e)}
                          />
                          <input
                            type="number"
                            style={{ width: "35%" }}
                            placeholder="Price"
                            name={e}
                            onChange={(e) => onChangePrice(e)}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              <p style={{ marginBottom: "0.25rem" }}>Actions : </p>
              <div className={styles.actions}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Axios({
                      url: `${MONITOR_BACKEND}/download/mou`,
                      method: "GET",
                      responseType: "blob",
                    }).then((res) => {
                      console.log(res);
                      fileDownload(res.data, "mou.docx");
                    });
                  }}
                >
                  Proposal
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Axios({
                      url: `${MONITOR_BACKEND}/download/circular`,
                      method: "GET",
                      responseType: "blob",
                    }).then((res) => {
                      console.log(res);
                      fileDownload(res.data, "circular.docx");
                    });
                  }}
                >
                  Circular
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Axios({
                      url: `${MONITOR_BACKEND}/download/curriculum`,
                      method: "GET",
                      responseType: "blob",
                    }).then((res) => {
                      console.log(res);
                      fileDownload(res.data, "curriculum.pdf");
                    });
                  }}
                >
                  Curriculum
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Axios({
                      url: `${MONITOR_BACKEND}/download/brochure`,
                      method: "GET",
                      responseType: "blob",
                    }).then((res) => {
                      console.log(res);
                      fileDownload(res.data, "brochure.pdf");
                    });
                  }}
                >
                  Brochure
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Axios({
                      url: `${MONITOR_BACKEND}/download/mou`,
                      method: "GET",
                      responseType: "blob",
                    }).then((res) => {
                      console.log(res);
                      fileDownload(res.data, "mou.docx");
                    });
                  }}
                >
                  MOU
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Axios({
                      url: `${MONITOR_BACKEND}/download/calender`,
                      method: "GET",
                      responseType: "blob",
                    }).then((res) => {
                      console.log(res);
                      fileDownload(res.data, "calender.xlsx");
                    });
                  }}
                >
                  Calender
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-evenly",
                  margin: "0.5rem 0",
                }}
              >
                <p>MOU Signed?</p>
                <button
                  style={{
                    backgroundColor: "#00a510",
                    color: "white",
                    padding: "0.5rem 1rem",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    axios
                      .put(`${MONITOR_BACKEND}/setStatus`, {
                        id: _id,
                        status: "Started",
                      })
                      .then((response) => {
                        console.log(response);
                        if (response.data.data.modifiedCount > 0) {
                          getUsers();
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Started
                </button>
              </div>
            </div>
            <button
              className={styles.btns}
              onClick={(e) => {
                e.preventDefault();
                addNewProgram();
              }}
            >
              Add Program
            </button>
          </form>
        ) : status === "New" ? (
          <>
            <form
              encType="multipart/form-data"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={styles.header}>
                <h1>Program Details</h1>
              </div>
              <div className={styles.inputSections}>
                <input
                  type="text"
                  placeholder="Class Name"
                  value={offer.name}
                  onChange={(e) => setOffer({ ...offer, name: e.target.value })}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    margin: "0.5rem 0",
                  }}
                >
                  <select
                    name=""
                    id=""
                    style={{ borderRadius: "1rem", fontWeight: "bold" }}
                    value={offer.model}
                    onChange={(e) =>
                      setOffer({ ...offer, model: e.target.value })
                    }
                  >
                    <option value="Model" selected disabled>
                      Model
                    </option>
                    <option value="Compulsory">Compulsory</option>
                    <option value="Optional">Optional</option>
                  </select>
                  <select
                    name=""
                    id=""
                    style={{ borderRadius: "1rem", fontWeight: "bold" }}
                    value={offer.mode}
                    onChange={(e) =>
                      setOffer({ ...offer, mode: e.target.value })
                    }
                  >
                    <option value="Mode" selected disabled>
                      Mode
                    </option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <select
                    name=""
                    id=""
                    style={{ borderRadius: "1rem", fontWeight: "bold" }}
                    value={offer.training}
                    onChange={(e) =>
                      setOffer({ ...offer, training: e.target.value })
                    }
                  >
                    <option value="Training" selected disabled>
                      Training
                    </option>
                    <option value="ToStudent">To Student</option>
                    <option value="ToTeacher">To Teacher</option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                    margin: "0.5rem 0",
                  }}
                >
                  <select
                    name=""
                    id=""
                    style={{ borderRadius: "1rem", fontWeight: "bold" }}
                    value={offer.payment}
                    onChange={(e) =>
                      setOffer({ ...offer, payment: e.target.value })
                    }
                  >
                    <option value="Payment" selected disabled>
                      Payment
                    </option>
                    <option value="ViaSchool">Via School</option>
                    <option value="ViaOnline">Via Online</option>
                    <option value="ViaCash">Via Cash</option>
                    <option value="ViaCheque">Via Cheque</option>
                  </select>
                  <select
                    name=""
                    id=""
                    style={{ borderRadius: "1rem", fontWeight: "bold" }}
                    value={offer.terms}
                    onChange={(e) =>
                      setOffer({ ...offer, terms: e.target.value })
                    }
                  >
                    <option value="Terms" selected disabled>
                      Terms
                    </option>
                    <option value="50-25-25">50-25-25</option>
                    <option value="50-0-50">50-0-50</option>
                    <option value="100-0-0">100-0-0</option>
                  </select>
                </div>
                <div className={styles.grades}>
                  <p>Grades</p>
                  <div className={styles.checkBoxes}>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        id=""
                        name="1"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                      />
                      <p>1</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        id=""
                        name="2"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                      />
                      <p>2</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="3"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>3</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="4"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>4</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="5"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>5</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="6"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>6</p>
                    </div>
                  </div>
                  <div className={styles.checkBoxes}>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="7"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>7</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="8"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>8</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="9"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>9</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="10"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>10</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="11"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>11</p>
                    </div>
                    <div className={styles.inputs}>
                      <input
                        type="checkbox"
                        name="12"
                        onChange={(e) => {
                          if (offer.classes.includes(e.target.name) === false) {
                            setOffer({
                              ...offer,
                              classes: [...offer.classes, e.target.name],
                            });
                          } else {
                            var index = offer.classes.indexOf(e.target.name);
                            var className = [...offer.classes];
                            className.splice(index, 1);
                            setOffer({ ...offer, classes: [...className] });
                          }
                        }}
                        id=""
                      />
                      <p>12</p>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.pricing}
                  style={
                    offer?.classes?.length > 0
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <p>Pricing</p>
                  {offer.classes?.length > 0 || !offer.classes.includes("")
                    ? offer.classes?.map((e) => {
                        return (
                          <div
                            className={styles.pricingInputs}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <input
                              type="text"
                              value={e}
                              style={{ width: "15%" }}
                            />
                            <input
                              type="number"
                              placeholder="No. of students"
                              style={{ width: "42%" }}
                              name={e}
                              onChange={(e) => onChangeStudents(e)}
                            />
                            <input
                              type="number"
                              style={{ width: "35%" }}
                              placeholder="Price"
                              name={e}
                              onChange={(e) => onChangePrice(e)}
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
                <p style={{ marginBottom: "0.25rem" }}>Actions : </p>
                <div className={styles.actions}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Axios({
                        url: `${MONITOR_BACKEND}/download/mou`,
                        method: "GET",
                        responseType: "blob",
                      }).then((res) => {
                        console.log(res);
                        fileDownload(res.data, "mou.docx");
                      });
                    }}
                  >
                    Proposal
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Axios({
                        url: `${MONITOR_BACKEND}/download/circular`,
                        method: "GET",
                        responseType: "blob",
                      }).then((res) => {
                        console.log(res);
                        fileDownload(res.data, "circular.docx");
                      });
                    }}
                  >
                    Circular
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Axios({
                        url: `${MONITOR_BACKEND}/download/curriculum`,
                        method: "GET",
                        responseType: "blob",
                      }).then((res) => {
                        console.log(res);
                        fileDownload(res.data, "curriculum.pdf");
                      });
                    }}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Axios({
                        url: `${MONITOR_BACKEND}/download/brochure`,
                        method: "GET",
                        responseType: "blob",
                      }).then((res) => {
                        console.log(res);
                        fileDownload(res.data, "brochure.pdf");
                      });
                    }}
                  >
                    Brochure
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Axios({
                        url: `${MONITOR_BACKEND}/download/mou`,
                        method: "GET",
                        responseType: "blob",
                      }).then((res) => {
                        console.log(res);
                        fileDownload(res.data, "mou.docx");
                      });
                    }}
                  >
                    MOU
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Axios({
                        url: `${MONITOR_BACKEND}/download/calender`,
                        method: "GET",
                        responseType: "blob",
                      }).then((res) => {
                        console.log(res);
                        fileDownload(res.data, "calender.xlsx");
                      });
                    }}
                  >
                    Calender
                  </button>
                </div>
              </div>
              <div>
                <CostBlock
                  value={costing.commission}
                  placeholder="Commission"
                  onChange={(e) =>
                    setCosting({ ...costing, commission: e.target.value })
                  }
                />
                <CostBlock
                  value={costing.kitCosting}
                  placeholder="Kit Costing"
                  onChange={(e) =>
                    setCosting({ ...costing, kitCosting: e.target.value })
                  }
                />
                <CostBlock
                  value={costing.partner}
                  placeholder="Partner"
                  onChange={(e) =>
                    setCosting({ ...costing, partner: e.target.value })
                  }
                />
                <CostBlock
                  value={costing.noOfBatches}
                  placeholder="No. Of Batches"
                  onChange={(e) =>
                    setCosting({ ...costing, noOfBatches: e.target.value })
                  }
                />
                <CostBlock
                  value={costing.educator}
                  placeholder="Educator"
                  onChange={(e) =>
                    setCosting({ ...costing, educator: e.target.value })
                  }
                />
                <CostBlock
                  value={costing.taxes}
                  placeholder="Taxes"
                  onChange={(e) =>
                    setCosting({ ...costing, taxes: e.target.value })
                  }
                />
                <CostBlock
                  value={costing.other}
                  placeholder="Other"
                  onChange={(e) =>
                    setCosting({ ...costing, other: e.target.value })
                  }
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0.5rem",
                  }}
                >
                  <p>Total</p>
                  <p>
                    Rs.{" "}
                    {parseInt(costing?.commission) +
                      parseInt(costing.educator) +
                      parseInt(costing.kitCosting) +
                      parseInt(costing.other) +
                      parseInt(costing.noOfBatches) +
                      parseInt(costing.partner) +
                      parseInt(costing.taxes)}
                  </p>
                </div>
              </div>
              <button
                className={styles.btns}
                onClick={(e) => {
                  e.preventDefault();
                  addNewProgram();
                }}
              >
                Add Program
              </button>
            </form>
          </>
        ) : (
          <>
            <p>Programs : </p>
            {programs
              ?.filter((program) => {
                console.log(program);
                return program?.school
                  ?.toLowerCase()
                  .includes(schoolName.toLowerCase());
              })
              .map((program) => {
                return program.pricing.map((price) => {
                  return (
                    <div className={styles.programBar}>
                      <p>Std {price.name} : B1</p>
                      <p>
                        <IoPeopleSharp size={18} />
                        {price.students}
                      </p>
                      <p>Rs. {price.value}</p>
                      <p>Upcoming</p>
                    </div>
                  );
                });
              })}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "0.75rem",
              }}
            >
              <p>Payment Status?</p>
              <button
                style={{
                  backgroundColor: "#00a510",
                  color: "white",
                  padding: "0.5rem 1rem",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  borderRadius: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowUserData(false);
                  axios
                    .put(`${MONITOR_BACKEND}/setStatus`, {
                      id: _id,
                      status: "MeetingSet",
                    })
                    .then((response) => {
                      console.log(response);
                      if (response.data.data.modifiedCount > 0) {
                        getUsers();
                        openModal();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                !Pay
              </button>
            </div>
          </>
        )}
        <div className={styles.commentContainer}>
          <p>Comments</p>
          <input
            type="text"
            name={styles.comment}
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
            placeholder="Add Comment"
          />
          <AiOutlineRight
            size={19}
            className={styles.icon}
            onClick={() => {
              if (
                comments.length > 0 &&
                comments !== " " &&
                comments !== "  " &&
                comments !== "   "
              ) {
                axios
                  .put(`${MONITOR_BACKEND}/addComment`, {
                    comment: comments,
                    id: _id,
                  })
                  .then((res) => {
                    if (res) {
                      getUsers();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                setComments("");
              }
            }}
          />
        </div>
        {comment.length > 0 ? (
          <>
            {displayComment ? (
              <>
                <div
                  className={styles.commentsDisplay}
                  onClick={() => setCmntDeleteDisplay(!cmntDeleteDisplay)}
                >
                  <h3>
                    {comment[comment.length - 1].user
                      ? comment[comment.length - 1].user
                      : "Samantha"}
                  </h3>
                  <h6>{comment[comment.length - 1].msg}</h6>
                  <p>
                    {new Date(comment[comment.length - 1].date)
                      .toString()
                      .slice(4, 21)}
                  </p>
                </div>
                {cmntDeleteDisplay ? (
                  <AiFillDelete
                    size={20}
                    style={{ paddingTop: "0.35rem", margin: "0 50%" }}
                    onClick={() =>
                      deleteComment(comment[comment.length - 1]._id)
                    }
                  />
                ) : null}
              </>
            ) : (
              comment.map(({ msg, date, user, _id }, i) => {
                return (
                  <div key={i}>
                    <div
                      className={styles.commentsDisplay}
                      key={i}
                      onClick={() => setCmntDeleteDisplay(!cmntDeleteDisplay)}
                    >
                      <h3>{user}</h3>
                      <h6>{msg}</h6>
                      <p>{new Date(date).toString().slice(4, 21)}</p>
                    </div>
                    {cmntDeleteDisplay ? (
                      <AiFillDelete
                        size={20}
                        style={{ paddingTop: "0.35rem", margin: "0 50%" }}
                        onClick={() => deleteComment(_id)}
                      />
                    ) : null}
                  </div>
                );
              })
            )}
            {comment.length > 1 ? (
              <p
                className={styles.viewALl}
                onClick={() => setDisplayComment(!displayComment)}
              >
                {displayComment ? "View all" : "Hide all"}
              </p>
            ) : null}
          </>
        ) : null}
        <div className={styles.inqReports}>
          <div className={styles.header}>
            <p className={styles.heading}>Inquiry Reports</p>
          </div>
          <div className={styles.content}>
            <div className={styles.container1}>
              <p>Start Time : {new Date(inqDate).toString().slice(4, 21)}</p>
              <p>Due Time : </p>
            </div>
            <div className={styles.container2}>
              <p>End Time : </p>
              <p>Assignee : {source}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CostBlock = ({ value, placeholder, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 0.5rem",
        justifyContent: "space-between",
      }}
    >
      <p>{placeholder}</p>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: "70%" }}
      />
    </div>
  );
};

export default FloatingUserData;