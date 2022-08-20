import React, { useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";

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
  price,
  setprice,
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
            <p>Class Timings</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <p className="valueSelectorHead">Start Time</p>
              <select
                style={{ width: "100%" }}
                name="stime"
                value={stime}
                className="valueSelector"
                onChange={(e) => {
                  setstime(e.target.value);
                  console.log(e.target.value);
                  setetime(
                    e.target.value.slice(3, 5) == "30"
                      ? moment({
                          hour: Number(e.target.value.slice(0, 2)),
                          minute: Number(e.target.value.slice(3, 5)),
                        })
                          .add(1, "hours")
                          .format("hh:mmA")
                      : moment({ hour: Number(e.target.value.slice(0, 2)) })
                          .add(1, "hours")
                          .format("hh:mmP")
                  );
                }}
              >
                <option value={"09:00AM"}>09:00AM</option>
                <option value={"09:30AM"}>09:30AM</option>
                <option value={"10:00AM"}>10:00AM</option>
                <option value={"10:30AM"}>10:30AM</option>
                <option value={"11:00AM"}>11:00AM</option>
                <option value={"11:30AM"}>11:30AM</option>
                <option value={"12:00PM"}>12:00PM</option>
                <option value={"12:30PM"}>12:30PM</option>
                <option value={"01:00PM"}>01:00PM</option>
                <option value={"01:30PM"}>01:30PM</option>
                <option value={"02:00PM"}>02:00PM</option>
                <option value={"02:30PM"}>02:30PM</option>
                <option value={"03:00PM"}>03:00PM</option>
                <option value={"03:30PM"}>03:30PM</option>
                <option value={"04:00PM"}>04:00PM</option>
                <option value={"04:30PM"}>04:30PM</option>
                <option value={"05:00PM"}>05:00PM</option>
                <option value={"05:30PM"}>05:30PM</option>
                <option value={"06:00PM"}>06:00PM</option>
                <option value={"06:30PM"}>06:30PM</option>
                <option value={"07:00PM"}>07:00PM</option>
                <option value={"07:30PM"}>07:30PM</option>
                <option value={"08:00PM"}>08:00PM</option>
                <option value={"08:30PM"}>08:30PM</option>
                <option value={"09:00PM"}>09:00PM</option>
                <option value={"09:30PM"}>09:30PM</option>
                <option value={"10:00PM"}>10:00PM</option>
                <option value={"10:30PM"}>10:30PM</option>
                <option value={"11:00PM"}>11:00PM</option>
                <option value={"11:30PM"}>11:30PM</option>
                <option value={"12:00AM"}>12:00AM</option>
                <option value={"12:30AM"}>12:30AM</option>
                <option value={"01:00AM"}>01:00AM</option>
                <option value={"01:30AM"}>01:30AM</option>
                <option value={"02:00AM"}>02:00AM</option>
                <option value={"02:30AM"}>02:30AM</option>
                <option value={"03:00AM"}>03:00AM</option>
                <option value={"03:30AM"}>03:30AM</option>
                <option value={"04:00AM"}>04:00AM</option>
                <option value={"04:30AM"}>04:30AM</option>
                <option value={"05:00AM"}>05:00AM</option>
                <option value={"05:30AM"}>05:30AM</option>
                <option value={"06:00AM"}>06:00AM</option>
                <option value={"06:30AM"}>06:30AM</option>
                <option value={"07:00AM"}>07:00AM</option>
                <option value={"07:30AM"}>07:30AM</option>
                <option value={"08:00AM"}>08:00AM</option>
                <option value={"08:30AM"}>08:30AM</option>
              </select>
              <p className="valueSelectorHead">End Time</p>
              <select
                style={{ width: "100%" }}
                name="etime"
                value={etime}
                className="valueSelector"
                onChange={(e) => {
                  setetime(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value={"09:00AM"}>09:00AM</option>
                <option value={"09:30AM"}>09:30AM</option>
                <option value={"10:00AM"}>10:00AM</option>
                <option value={"10:30AM"}>10:30AM</option>
                <option value={"11:00AM"}>11:00AM</option>
                <option value={"11:30AM"}>11:30AM</option>
                <option value={"12:00PM"}>12:00PM</option>
                <option value={"12:30PM"}>12:30PM</option>
                <option value={"01:00PM"}>01:00PM</option>
                <option value={"01:30PM"}>01:30PM</option>
                <option value={"02:00PM"}>02:00PM</option>
                <option value={"02:30PM"}>02:30PM</option>
                <option value={"03:00PM"}>03:00PM</option>
                <option value={"03:30PM"}>03:30PM</option>
                <option value={"04:00PM"}>04:00PM</option>
                <option value={"04:30PM"}>04:30PM</option>
                <option value={"05:00PM"}>05:00PM</option>
                <option value={"05:30PM"}>05:30PM</option>
                <option value={"06:00PM"}>06:00PM</option>
                <option value={"06:30PM"}>06:30PM</option>
                <option value={"07:00PM"}>07:00PM</option>
                <option value={"07:30PM"}>07:30PM</option>
                <option value={"08:00PM"}>08:00PM</option>
                <option value={"08:30PM"}>08:30PM</option>
                <option value={"09:00PM"}>09:00PM</option>
                <option value={"09:30PM"}>09:30PM</option>
                <option value={"10:00PM"}>10:00PM</option>
                <option value={"10:30PM"}>10:30PM</option>
                <option value={"11:00PM"}>11:00PM</option>
                <option value={"11:30PM"}>11:30PM</option>
                <option value={"12:00AM"}>12:00AM</option>
                <option value={"12:30AM"}>12:30AM</option>
                <option value={"01:00AM"}>01:00AM</option>
                <option value={"01:30AM"}>01:30AM</option>
                <option value={"02:00AM"}>02:00AM</option>
                <option value={"02:30AM"}>02:30AM</option>
                <option value={"03:00AM"}>03:00AM</option>
                <option value={"03:30AM"}>03:30AM</option>
                <option value={"04:00AM"}>04:00AM</option>
                <option value={"04:30AM"}>04:30AM</option>
                <option value={"05:00AM"}>05:00AM</option>
                <option value={"05:30AM"}>05:30AM</option>
                <option value={"06:00AM"}>06:00AM</option>
                <option value={"06:30AM"}>06:30AM</option>
                <option value={"07:00AM"}>07:00AM</option>
                <option value={"07:30AM"}>07:30AM</option>
                <option value={"08:00AM"}>08:00AM</option>
                <option value={"08:30AM"}>08:30AM</option>
              </select>
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
          <div style={{ margin: "0.75rem 0" }}>
            <p>Price per hour</p>
            <input
              type="number"
              name="price"
              value={price}
              className="price"
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
