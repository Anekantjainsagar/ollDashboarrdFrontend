import React, { useEffect, useState } from "react";
import styles from "../../Screens/FloatingUserData/style.module.css";
import ActionButtons from "../ActionButtons";
import { ToastContainer, toast } from "react-toastify";
import MONITOR_BACKEND from "../../Utils";
import axios from "axios";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const FollowUpProgram = ({ getPrograms, user, setShowUserData, programs }) => {
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
            getPrograms();
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

  const [program, setProgram] = useState();
  const [expenseShow, setExpenseShow] = useState(false);
  const [pricing, setPricing] = useState([]);
  const [offer, setOffer] = useState({
    name: program?.school,
    classes: [],
    model: program?.model,
    payment: program?.payment,
    mode: program?.mode,
    terms: program?.terms,
    training: program?.training,
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

  let expense;
  let revenue = 0;
  let margin;

  useEffect(() => {
    const pg = programs.find((program) =>
      program.schoolID.toLowerCase().includes(user?._id.toLowerCase())
    );
    setProgram(pg);
    setOffer({
      name: pg?.school,
      classes: [...pg.pricing.map((e) => e.name)],
      model: pg?.model,
      payment: pg?.payment,
      mode: pg?.mode,
      terms: pg?.terms,
      training: pg?.training,
    });
    setPricing(pg?.pricing);
    setCosting(pg?.costing);
  }, []);

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
              onChange={(e) => setOffer({ ...offer, model: e.target.value })}
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
              onChange={(e) => setOffer({ ...offer, training: e.target.value })}
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
              onChange={(e) => setOffer({ ...offer, payment: e.target.value })}
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
              onChange={(e) => setOffer({ ...offer, terms: e.target.value })}
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
              ? pricing?.map((e) => {
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
                        value={e.name}
                        style={{ width: "15%" }}
                      />
                      <input
                        type="number"
                        placeholder="No. of students"
                        style={{ width: "42%" }}
                        value={e.students}
                        onChange={(e) => onChangeStudents(e)}
                      />
                      <input
                        type="number"
                        style={{ width: "35%" }}
                        placeholder="Price"
                        value={e.value}
                        onChange={(e) => onChangePrice(e)}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <button
            className={styles.btns}
            onClick={(e) => {
              e.preventDefault();
              addNewProgram();
            }}
          >
            Update Program
          </button>
          <ActionButtons />
        </div>
        <div style={{ margin: "0.5rem 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem 1rem",
              backgroundColor: "#333333",
              borderRadius: "1rem",
              width: "100%",
            }}
            onClick={(e) => {
              e.preventDefault();
              setExpenseShow(!expenseShow);
            }}
          >
            <p style={{ fontSize: "1.7rem" }}>Expenses</p>
            {expenseShow ? (
              <AiOutlineUp size={20} />
            ) : (
              <AiOutlineDown size={20} />
            )}
          </div>
          <div
            className={styles.expense}
            style={expenseShow ? { display: "block" } : { display: "none" }}
          >
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
                justifyContent: "center",
                margin: "auto",
                padding: "0.35rem 0",
              }}
            >
              <p>Total Expenses :- </p>
              <p>
                {" "}
                Rs.{" "}
                {
                  (expense =
                    parseInt(costing?.commission) +
                    parseInt(costing.educator) +
                    parseInt(costing.kitCosting) +
                    parseInt(costing.other) +
                    parseInt(costing.noOfBatches) +
                    parseInt(costing.partner) +
                    parseInt(costing.taxes))
                }
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                padding: "0.35rem 0",
              }}
            >
              <p>Revenue :- </p>
              <p>
                {" "}
                Rs.{" "}
                {pricing?.forEach((e) => {
                  revenue =
                    parseInt(revenue) +
                    parseInt(parseInt(e?.students) * parseInt(e?.value));
                })}
                {revenue}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                padding: "0.35rem 0",
              }}
            >
              <p>Margin :- </p>
              <p> Rs. {(margin = revenue - expense)}</p>
            </div>
          </div>
        </div>
      </form>
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

export default FollowUpProgram;
