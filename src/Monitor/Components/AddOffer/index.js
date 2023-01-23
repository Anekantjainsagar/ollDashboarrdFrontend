import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styles from "./style.module.css";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddOffer = ({ setIsOpen, modalIsOpen, getOffers }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "25%",
      height: "64%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "scroll",
      padding: "1rem 2rem",
      borderRadius: "1rem",
      backgroundColor: "#000",
    },
  };
  const [pricing, setPricing] = useState([]);
  const [kit, setKit] = useState(false);
  const [offer, setOffer] = useState({
    name: "",
    details: "",
    classes: [],
    duration: "",
    curriculum: "",
    brochure: "",
    circular: "",
  });

  const addNewOffer = () => {
    if (offer.name.length > 0 && offer.details.length > 0) {
      axios
        .post(`${MONITOR_BACKEND}/addOffer`, { ...offer, kit, pricing })
        .then((response) => {
          console.log(response);
          setOffer({
            name: "",
            details: "",
            classes: [],
            duration: "",
            curriculum: "",
            brochure: "",
            circular: "",
          });
          setIsOpen(false);
          setKit(false);
          setPricing([]);
          getOffers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (offer.classes.length > 0) {
      const newState = offer.classes.map((e) => {
        const obj = pricing?.find((element) => element.name === e);
        return obj?.name?.length > 0
          ? { name: obj?.name, value: obj?.value }
          : { name: e, value: "" };
      });
      setPricing([...newState]);
    }
  }, [offer.classes]);

  const onChange = (e) => {
    const newState = pricing.map((element) => {
      return element?.name === e.target.name
        ? { name: element.name, value: e.target.value }
        : element;
    });
    setPricing([...newState]);
  };

  function closeModal() {
    setIsOpen(false);
  }

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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        id="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          encType="multipart/form-data"
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={styles.header}>
            <h1>Offer Details</h1>
            <AiOutlineClose
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => closeModal()}
            />
          </div>
          <div className={styles.inputSections}>
            <input
              type="text"
              placeholder="Class Name"
              value={offer.name}
              onChange={(e) => setOffer({ ...offer, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Details Offering"
              value={offer.details}
              onChange={(e) => setOffer({ ...offer, details: e.target.value })}
            />
            <input
              type="number"
              placeholder="Class Duration"
              value={offer.duration}
              onChange={(e) => setOffer({ ...offer, duration: e.target.value })}
            />
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
                offer.classes.length > 0
                  ? { display: "block", margin: "0.25rem" }
                  : { display: "none" }
              }
            >
              <p style={{ fontSize: "1.65rem" }}>Pricing</p>
              {offer.classes.map((e, i) => {
                return (
                  <div className={styles.pricingInputs} key={i}>
                    <input type="text" value={e} />
                    <input
                      type="number"
                      name={e}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              placeholder="Curriculam"
              name=""
              id=""
              value={offer.curriculum}
              onChange={(e) =>
                setOffer({ ...offer, curriculum: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Brochure"
              name=""
              id=""
              value={offer.brochure}
              onChange={(e) => setOffer({ ...offer, brochure: e.target.value })}
            />
            <input
              type="text"
              placeholder="Circular"
              name=""
              id=""
              value={offer.circular}
              onChange={(e) => setOffer({ ...offer, circular: e.target.value })}
            />
          </div>
          <button
            className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              addNewOffer();
            }}
          >
            Add
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddOffer;
