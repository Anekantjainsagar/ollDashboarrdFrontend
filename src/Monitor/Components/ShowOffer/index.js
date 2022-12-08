import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import styles from "./style.module.css";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ShowOffer = ({ setIsOpen, modalIsOpen, getOffers, offers }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "25%",
      height: "55%",
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
  const [kit, setKit] = useState("");
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
            <p style={{ margin: "1rem 0", textAlign: "center" }}>
              Class - {offers?.name}
            </p>
            <p style={{ margin: "1rem 0", textAlign: "center" }}>
              Details - {offers?.details}
            </p>
            <p style={{ margin: "1rem 0", textAlign: "center" }}>
              Duration - {offers?.duration}
            </p>
            {/* <div className={styles.grades}>
              <p style={{margin:"1rem 0",textAlign:"center"}}>Grades</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>1</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>2</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>3</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>4</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>5</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>6</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>7</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>8</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>9</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>10</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>11</p>
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
                  <p style={{margin:"1rem 0",textAlign:"center"}}>12</p>
                </div>
              </div>
            </div> */}
            {/* <div
              className={styles.pricing}
              style={
                offer.classes.length > 0
                  ? { display: "block", margin: "0.25rem" }
                  : { display: "none" }
              }
            >
              <p style={{ fontSize: "1.65rem" }}>Pricing</p>
              {offer.classes.map((e) => {
                return (
                  <div className={styles.pricingInputs}>
                    <input type="text" value={e} />
                    <input
                      type="number"
                      name={e}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                );
              })}
            </div> */}
            <div>
              <p
                style={{
                  margin: "0.2rem 0",
                  fontSize: "1.7rem",
                  fontWeight: "600",
                }}
              >
                Classes
              </p>
              {offers?.pricing.map((e) => {
                return (
                  <p style={{ margin: "0.4rem 0", textAlign: "center" }}>
                    {e.name}th class have the price of {e.value}
                  </p>
                );
              })}
            </div>
            <p style={{ margin: "1rem 0", textAlign: "center" }}>
              Curriculam - {offers?.curriculum}
            </p>
            <p style={{ margin: "1rem 0", textAlign: "center" }}>
              Brochure - {offers?.brochure}
            </p>
            <p style={{ margin: "1rem 0", textAlign: "center" }}>
              Circular - {offers?.circular}
            </p>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ShowOffer;
