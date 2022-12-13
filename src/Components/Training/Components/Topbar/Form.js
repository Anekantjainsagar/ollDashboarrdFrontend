import TRAINING_BACKEND from "../../utils";
import React, { useState } from "react";
import axios from "axios";
import { css } from "glamor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BatchDetails from "./BatchDetails";

const Form = ({ getRequirements, sales }) => {
  const [details, setDetails] = useState(false);
  const [height, setHeight] = useState();

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

  const [openings, setOpenings] = useState();
  const [eTime, setETime] = useState("");
  const [requirements, setRequirements] = useState({
    course: "",
    type: "None",
    model: "",
    assignee: "",
    days: [],
    location: "",
    sTime: "",
    startDate: date,
  });

  const postData = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${TRAINING_BACKEND}/addRequirement`, {
      ...requirements,
      eTime,
      openings,
    });

    if (res.data) {
      setRequirements({
        course: "",
        type: "None",
        model: "",
        assignee: "",
        days: [""],
        location: "",
        sTime: "",
        startDate: date,
      });
      setETime("");
      setOpenings("");
    }
    getRequirements();

    const notify = () =>
      toast("Requirement added successfully", {
        type: "success",
      }).configure({
        bodyClassName: css({
          backgroundColor: "blue",
          height: "100%",
          width: "100%",
        }),
      });
    notify();
  };

  return (
    <>
      <div className="inputUserContainer">
        <form action="" style={{ width: "70vw" }}>
          <div className="inputSection">
            <div className="inputContainer">
              <input
                type="text"
                name="course"
                value={requirements.course}
                onChange={(e) =>
                  setRequirements({ ...requirements, course: e.target.value })
                }
                placeholder="Course Name"
                className="input"
              />
              <button
                className="detailsBtn"
                onClick={(e) => {
                  setHeight(e.clientY);
                  e.preventDefault();
                  setDetails(!details);
                }}
              >
                Batch Details
              </button>
              <BatchDetails
                details={details}
                setDetails={setDetails}
                height={height}
                requirements={requirements}
                setRequirements={setRequirements}
                eTime={eTime}
                setEtime={setETime}
              />
              <input
                type="text"
                name="model"
                value={requirements.model}
                onChange={(e) =>
                  setRequirements({ ...requirements, model: e.target.value })
                }
                placeholder="Model"
                className="input"
              />
              <input
                type="number"
                name="openings"
                value={openings}
                onChange={(e) => setOpenings(e.target.value)}
                placeholder="Openings"
                className="input"
              />
              <input
                type="text"
                name="assignee"
                value={requirements.assignee}
                onChange={(e) =>
                  setRequirements({ ...requirements, assignee: e.target.value })
                }
                placeholder="Assigned To"
                className="input"
              />
            </div>
          </div>
          <button
            className="button"
            style={{ padding: "0.35rem 1rem", marginBottom: "0.75rem" }}
            onClick={postData}
          >
            Add Requirements
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </>
  );
};

export default Form;
