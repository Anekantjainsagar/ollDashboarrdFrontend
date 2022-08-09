import React, { useRef, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

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

const BatchDetails = ({
  details,
  setDetails,
  mode,
  setmode,
  type,
  settype,
  address,
  setaddress,
  days,
  setdays,
  startDate,
  setstartDate,
  stime,
  setstime,
  sessionsCount,
  setsessionsCount,
  etime,
  setetime,
}) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, details, setDetails);

  return (
    <div
      ref={ref}
      className="detailsBtnContainer"
      style={details === true ? { display: "block" } : { display: "none" }}
    >
      <div className="header">
        <p>Batch Detail</p>
        <AiOutlineClose
          size={18}
          color="white"
          onClick={() => setDetails(!details)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="selectModes">
        <div
          className="selectMode"
          name="mode"
          value={mode}
          onChange={(e) => setmode(e.target.value)}
        >
          <p>Mode</p>
          <div
            style={{
              margin: "0.75rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
            }}
          >
            <input
              style={{ color: "black", cursor: "pointer" }}
              type={"radio"}
              name="mode"
              value={"Online"}
            />
            <p style={{ marginLeft: "0.4rem" }}>Onl.</p>
          </div>
          <div
            style={{
              margin: "0.75rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
            }}
          >
            <input
              style={{ color: "black", cursor: "pointer" }}
              type={"radio"}
              name="mode"
              value={"Offline"}
            />
            <p style={{ marginLeft: "0.4rem" }}>Off.</p>
          </div>
        </div>
        <div
          className="selectMode"
          value={type}
          onChange={(e) => settype(e.target.value)}
        >
          <p>Type</p>
          <div
            style={{
              margin: "0.75rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
            }}
          >
            <input
              style={{ color: "black", cursor: "pointer" }}
              type={"radio"}
              name="type"
              value={"1 to 1"}
            />
            <p style={{ marginLeft: "0.4rem" }}>1 on 1</p>
          </div>
          <div
            style={{
              margin: "0.75rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
            }}
          >
            <input
              style={{ color: "black", cursor: "pointer" }}
              type={"radio"}
              value="group"
              name="type"
            />
            <p style={{ marginLeft: "0.4rem" }}>Group</p>
          </div>
        </div>
        <div
          className="selectMode"
          name="days"
          value={days}
          onChange={(e) => setdays(e.target.value)}
        >
          <p>Days</p>
          <div
            style={{
              margin: "0.75rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
            }}
          >
            <input
              style={{ color: "black", cursor: "pointer" }}
              type={"radio"}
              name="days"
              value={"MWF"}
            />
            <p style={{ marginLeft: "0.4rem" }}>MWF</p>
          </div>
          <div
            style={{
              margin: "0.75rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
            }}
          >
            <input
              style={{ color: "black", cursor: "pointer" }}
              type={"radio"}
              name="days"
              value={"TTF"}
            />
            <p style={{ marginLeft: "0.4rem" }}>TTF</p>
          </div>
          <div
            style={{
              margin: "0.75rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
            }}
          >
            <input
              style={{ color: "black", cursor: "pointer" }}
              type={"radio"}
              name="days"
              value={"SS"}
            />
            <p style={{ marginLeft: "0.4rem" }}>SS</p>
          </div>
        </div>
      </div>
      <div className="inputSections">
        <div className="inputSection">
          <div style={{ margin: "0.75rem 0" }}>
            <p>Start Date</p>
            <input
              type="date"
              name="startDate"
              value={startDate}
              d
              onChange={(e) => setstartDate(e.target.value)}
            />
          </div>
          <div style={{ margin: "0.75rem 0" }}>
            <p>Time</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <input
                type="time"
                style={{ width: "100%" }}
                name="time"
                value={stime}
                onChange={(e) => {
                  setstime(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <input
                type="time"
                style={{ width: "100%" }}
                name="time"
                value={etime}
                onChange={(e) => {
                  setetime(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="inputSection">
          <div style={{ margin: "0.75rem 0" }}>
            <p>No. Sessions</p>
            <input
              type="number"
              name="sessionsCount"
              value={sessionsCount}
              onChange={(e) => setsessionsCount(e.target.value)}
            />
          </div>
          <div style={{ margin: "0.75rem 0" }}>
            <p>Adress (opt)</p>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
