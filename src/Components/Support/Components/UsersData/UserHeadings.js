import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import "../../../../css/filters.css";

const UserHeadings = ({ filter, setfilter }) => {
  return (
    <>
      <div className="userPanelHeadings">
        <p className="id">ID</p>
        <p className="inquiryDate">Raise Date</p>
        <p className="name">Type</p>
        <p className="phone">Issue Details</p>
        <p className="classType">
          Class Type{" "}
        </p>
        <p className="offerDetails">Offer Det.</p>
        <p className="status">
          Status
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
        <p className="actions">Actions</p>
        <p className="source">Source</p>
        <p className="stage">
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
      </div>
    </>
  );
};

export default UserHeadings;
