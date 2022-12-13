import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineRight } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import FloatingUserData from "./FloatingUserData";
import TRAINING_BACKEND from "../../utils";
import ShowModal from "./ShowModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const User = (props) => {
  const {
    course,
    rid,
    type,
    model,
    raiseDate,
    location,
    _id,
    stage,
    assignee,
  } = props.data;

  const [details, setDetails] = useState(false);
  const [comment, setcomment] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [stageValue, setStageValue] = useState("");

  function openModal(e, data) {
    setIsOpen(true);
  }

  return (
    <>
      <ShowModal
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        setIsOpen={setIsOpen}
      />
      <div style={{ position: "absolute" }}>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <div
        className="userOfOperation"
        onClick={() => {
          setDetails(!details);
        }}
        style={{ cursor: "pointer" }}
      >
        <p>{rid}</p>
        <p>{new Date(raiseDate).toString().slice(4, 21)}</p>
        <p>{course}</p>
        <p>{model + " " + type}</p>
        <p>{location}</p>
        <p
          className="stageOperationsValue"
          onClick={(e) => e.stopPropagation()}
        >
          <select
            style={{ width: "73%" }}
            value={stageValue?.length > 0 ? stageValue : stage}
            className={stageValue?.length > 0 ? stageValue : stage}
            onChange={async (e) => {
              e.stopPropagation();
              setStageValue(e.target.value);
              await axios
                .put(`${TRAINING_BACKEND}/setStage`, {
                  id: _id,
                  newStage: e.target.value,
                })
                .then((response) => {
                  if (response?.data?.modifiedCount > 0) {
                    props.getRequirements();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <option className="New" value="New">
              New
            </option>
            <option className="Posting" value="Posting">
              Posting
            </option>
            <option className="Filtering" value="Filtering">
              Filtering
            </option>
            <option className="Completed" value="Completed">
              Completed
            </option>
          </select>
        </p>
        <p className="actionsOperationValue">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              placeholder="Comment.."
              autoFocus={true}
              style={{ backgroundColor: "#4b4b4b" }}
            />
            <AiOutlineRight
              size={19}
              className="icon"
              onClick={() => {
                if (
                  comment.length > 0 &&
                  comment !== " " &&
                  comment !== "  " &&
                  comment !== "   "
                ) {
                  axios
                    .put(`${TRAINING_BACKEND}/comment`, {
                      id: _id,
                      comment: comment,
                    })
                    .then((response) => {
                      if (response?.data?.modifiedCount > 0) {
                        props.getRequirements();
                        setcomment("");
                      }
                    });
                }
              }}
            />
          </div>
        </p>
        <p>{assignee}</p>
        <FloatingUserData
          data={props.data}
          details={details}
          setDetails={setDetails}
          sales={props.sales}
          getRequirements={props.getRequirements}
          requirements={props.requirements}
        />
      </div>
    </>
  );
};

export default User;
