import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import "../../../../css/filters.css";
import "./index.css";

const UserHeadings = ({ filter, setfilter }) => {
  return (
    <>
      <div className="userOperationHeadings">
        <p className="idOperation">ID</p>
        <p className="raiseDate">Raise Date</p>
        <p className="type">
          Type
          <AiOutlineFilter
            style={{ marginLeft: "0.5rem" }}
            size={20}
            className="icon"
          />
          <select
            className="filterSelector"
            value={filter.status}
            onChange={(e) => {
              console.log(e.target.value);
              setfilter({ ...filter, status: e.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="follow">Fol. Up</option>
            <option value="noPay">!Pay</option>
            <option value="noCourse">!Course</option>
            <option value="started">Started</option>
            <option value="offReady">Offer Ready</option>
            <option value="noTeacher">!Teacher</option>
            <option value="noBatch">!Batch</option>
          </select>
        </p>
        <p className="issueDetail">Issue Details</p>
        <p className="priority">
          Priority
          <AiOutlineFilter
            style={{ marginLeft: "0.5rem" }}
            size={20}
            className="icon"
          />
          <select
            className="filterSelector"
            value={filter.priority}
            onChange={(e) => {
              console.log(e.target.value);
              setfilter({ ...filter, priority: e.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="Urg">Urgant</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </p>
        <p className="stageOperation">
          Stage
          <AiOutlineFilter
            style={{ marginLeft: "0.5rem" }}
            size={20}
            className="icon"
          />
          <select
            className="filterSelector"
            value={filter.stage}
            onChange={(e) => {
              console.log(e.target.value);
              setfilter({ ...filter, stage: e.target.value });
            }}
          >
            <option value="all">🙃 All</option>
            <option value="🔥 hot">🔥 Hot</option>
            <option value="🥵 warm">🥵 Warm</option>
            <option value="🥶 cold">🥶 Cold</option>
            <option value="🥳 won">🥳 Won</option>
          </select>
        </p>
        <p className="actionsOperation">Actions</p>
        <p className="sourceOperation">Source</p>
        <p className="resolveDate">Resolving Date</p>
      </div>
    </>
  );
};

export default UserHeadings;
