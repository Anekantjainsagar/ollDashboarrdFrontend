import React, { useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import times from "../../Topbar/times";
import "./style.css";

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
  user,
  setUser,
  eTime,
  setETime,
}) => {
  const ref = useRef(null);
  useOutsideAlerter(ref, details, setDetails);

  return (
    <div
      ref={ref}
      className="detailsBtnContainer"
      style={
        details === true
          ? { display: "block", width: "80%" }
          : { display: "none" }
      }
    >
      <div className="header">
        <p>Batch Detail</p>
        <button
          className="button"
          style={{ width: "30%" }}
          onClick={(e) => {
            e.preventDefault();
            if (user?.sessionCount && user?.price) {
              setUser({
                ...user,
                totalPrice: user?.sessionCount * user?.price,
              });
            }
            if (user?.totalPrice && user?.sessionCount) {
              setUser({
                ...user,
                price: user?.totalPrice / user?.sessionCount,
              });
            }
            if (user?.totalPrice && user?.price) {
              setUser({
                ...user,
                sessionCount: user?.totalPrice / user?.price,
              });
            }
            setTimeout(() => {
              setDetails(!details);
            }, 500);
          }}
        >
          Save
        </button>
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
          value={user?.mode}
          onChange={(e) => setUser({ ...user, mode: e.target.value })}
        >
          <p>Mode</p>
          <div
            style={{
              margin: "0.75rem 0",
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
              name="mode"
              value={"none"}
            />
            <p style={{ marginLeft: "0.4rem" }}>None</p>
          </div>
          <div
            style={{
              margin: "0.75rem 0",
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
              name="mode"
              value={"Offline"}
            />
            <p style={{ marginLeft: "0.4rem" }}>Off.</p>
          </div>
        </div>
        <div
          className="selectMode"
          value={user?.type}
          onChange={(e) => setUser({ ...user, type: e.target.value })}
        >
          <p>Type</p>
          <div
            style={{
              margin: "0.75rem 0",
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
              value={"none"}
            />
            <p style={{ marginLeft: "0.4rem" }}>None</p>
          </div>
          <div
            style={{
              margin: "0.75rem 0",
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
              margin: "0.75rem 0",
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
              value="group"
              name="type"
            />
            <p style={{ marginLeft: "0.4rem" }}>Group</p>
          </div>
          <div
            style={{
              margin: "0.75rem 0",
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
              value={"Trial"}
            />
            <p style={{ marginLeft: "0.4rem" }}>Trial</p>
          </div>
        </div>
        <div className="selectMode">
          <p>Days</p>
          {daysValue?.map((e, i) => {
            return (
              <div
                key={i}
                style={{
                  margin: "0.5rem 0",
                  paddingLeft: "0.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <input
                  type="checkbox"
                  style={{ width: "fit-content", marginRight: "0.5rem" }}
                  id={e}
                  name={e}
                  value={e}
                  onChange={async (e) => {
                    if (user?.days.includes(e.target.value) === false) {
                      if (e.target.checked === true) {
                        setUser({
                          ...user,
                          days: [...user?.days, e.target.value],
                        });
                      }
                    } else if (e.target.checked === false) {
                      let arr = [...user?.days];
                      const index = arr.indexOf(e.target.value);
                      arr.splice(index, 1);
                      setUser({
                        ...user,
                        days: [...arr],
                      });
                    }
                  }}
                />
                <p style={{ fontSize: "1.6rem" }}>{e}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="inputSections">
        <div className="inputSection">
          <div style={{ margin: "0.75rem 0" }}>
            <p>Start Date</p>
            <input
              type="date"
              name="startDate"
              value={user?.startDate}
              d
              onChange={(e) => setUser({ ...user, startDate: e.target.value })}
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
                value={user?.sTime}
                className="valueSelector"
                onChange={(e) => {
                  setUser({ ...user, sTime: e.target.value });
                  var index =
                    e.target.value === "--"
                      ? times.indexOf(e.target.value)
                      : times.indexOf(e.target.value) + 2;
                  setETime(times[index]);
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
              <p className="valueSelectorHead">End Time</p>
              <select
                style={{ width: "100%" }}
                name="etime"
                value={eTime}
                className="valueSelector"
                onChange={(e) => {
                  setETime(e.target.value);
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
        <div className="inputSection">
          <div style={{ margin: "0.75rem 0" }}>
            <p>No. Sessions</p>
            <input
              type="number"
              name="sessionsCount"
              value={user?.sessionCount}
              onChange={(e) =>
                setUser({ ...user, sessionCount: e.target.value })
              }
            />
          </div>
          <div style={{ margin: "0.75rem 0" }}>
            <p>Adress (opt)</p>
            <input
              type="text"
              name="address"
              value={user?.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>
          <div style={{ margin: "0.75rem 0" }}>
            <p>Price per hour</p>
            <input
              type="number"
              name="price"
              value={user?.price}
              className="price"
              onChange={(e) => setUser({ ...user, price: e.target.value })}
            />
          </div>
          <div style={{ margin: "0.75rem 0" }}>
            <p>Total Price</p>
            <input
              type="number"
              name="totalPrice"
              value={user?.totalPrice}
              className="price"
              onChange={(e) => setUser({ ...user, totalPrice: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
