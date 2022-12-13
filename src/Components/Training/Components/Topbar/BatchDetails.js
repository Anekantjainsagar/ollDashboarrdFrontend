import React, { useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import times from "../../../Topbar/times";

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

const daysValue = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const BatchDetails = ({
  details,
  setDetails,
  requirements,
  setRequirements,
  height,
  eTime,
  setEtime,
}) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, details, setDetails);

  return (
    <div
      ref={ref}
      className="detailsBtnContainer"
      style={
        details === true
          ? { display: "block", top: `${height + 30}px`, left: "13%" }
          : { display: "none" }
      }
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
          value={requirements.type}
          onChange={(e) =>
            setRequirements({ ...requirements, type: e.target.value })
          }
        >
          <p>Type</p>
          <div
            style={{
              margin: "0.25rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              style={{
                color: "black",
                cursor: "pointer",
                width: "fit-content",
              }}
              type={"radio"}
              name="type"
              value={"None"}
            />
            <p style={{ marginLeft: "0.4rem" }}>None</p>
          </div>
          <div
            style={{
              margin: "0.25rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              style={{
                color: "black",
                cursor: "pointer",
                width: "fit-content",
              }}
              type={"radio"}
              name="type"
              value={"1 to 1"}
            />
            <p style={{ marginLeft: "0.4rem" }}>1 on 1</p>
          </div>
          <div
            style={{
              margin: "0.25rem 0",
              paddingLeft: "0.15rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              style={{
                color: "black",
                cursor: "pointer",
                width: "fit-content",
              }}
              type={"radio"}
              value="Group"
              name="type"
            />
            <p style={{ marginLeft: "0.4rem" }}>Group</p>
          </div>
        </div>
        <div className="selectMode">
          <p>Days</p>
          {daysValue?.map((e, i) => {
            return (
              <div
                key={i}
                style={{
                  margin: "0.3rem 0",
                }}
              >
                <input
                  type="checkbox"
                  style={{ width: "fit-content" }}
                  id={e}
                  name={e}
                  value={e}
                  onChange={async (e) => {
                    if (requirements?.days.includes(e.target.value) === false) {
                      if (e.target.checked === true) {
                        setRequirements({
                          ...requirements,
                          days: [...requirements?.days, e.target.value],
                        });
                      }
                    } else if (e.target.checked === false) {
                      let arr = [...requirements?.days];
                      const index = arr.indexOf(e.target.value);
                      arr.splice(index, 1);
                      setRequirements({ ...requirements, days: [...arr] });
                    }
                  }}
                />
                <label for={e} style={{ fontSize: "1.6rem" }}>
                  {" "}
                  {e}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="inputSections">
        <div className="inputSection">
          <div style={{ margin: "1.05rem 0 0.5rem 0" }}>
            <p>Start Date</p>
            <input
              type="date"
              name="startDate"
              style={{ width: "100%" }}
              value={requirements.startDate}
              onChange={(e) =>
                setRequirements({ ...requirements, startDate: e.target.value })
              }
            />
          </div>
          <div>
            <p>Location</p>
            <input
              type="text"
              style={{ width: "100%" }}
              name="address"
              placeholder="Location"
              value={requirements.location}
              onChange={(e) =>
                setRequirements({ ...requirements, location: e.target.value })
              }
            />
          </div>
        </div>
        <div className="inputSection">
          <div style={{ margin: "0.75rem 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <p className="valueSelectorHead"> Class Start Time</p>
              <select
                style={{ width: "100%" }}
                name="stime"
                value={requirements.sTime}
                className="valueSelector"
                onChange={(e) => {
                  setRequirements({ ...requirements, sTime: e.target.value });
                  var index =
                    e.target.value === "--"
                      ? times.indexOf(e.target.value)
                      : times.indexOf(e.target.value) + 2;
                  setEtime(times[index]);
                }}
              >
                {times.map((time, index) => {
                  return (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                marginTop: "0.6rem",
              }}
            >
              <p className="valueSelectorHead">Class End Time</p>
              <select
                style={{ width: "100%" }}
                name="etime"
                value={eTime}
                className="valueSelector"
                onChange={(e) => {
                  setEtime(e.target.value);
                }}
              >
                {times.map((time, index) => {
                  return (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
