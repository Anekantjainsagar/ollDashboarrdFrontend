import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import "../../css/filters.css";

const UserHeadings = (
  filterByClass,
  setfilterByClass,
  filterByStatus,
  setfilterByStatus,
  filterByStage,
  setfilterByStage
) => {
  console.log(filterByStage)
  return (
    <>
      <div className="userPanelHeadings">
        <p className="id">ID</p>
        <p className="inquiryDate">Inquiry Date</p>
        <p className="name">Name</p>
        <p className="phone">Phone</p>
        <p className="classType">
          Class Type{" "}
          <AiOutlineFilter
            style={{ marginLeft: "0.5rem" }}
            size={20}
            className="icon"
          />
          <select className="filterSelector">
            <option value="group Online">group Online</option>
            <option value="group Offline">group Offline</option>
            <option value="1 to 1 Online">1 to 1 Online</option>
            <option value="1 to 1 Offline">1 to 1 Online</option>
          </select>
        </p>
        <p className="offerDetails">Offer Det.</p>
        <p className="status">
          Status
          <AiOutlineFilter
            style={{ marginLeft: "0.5rem" }}
            size={20}
            className="icon"
          />
          <select className="filterSelector">
            <option value="new">New</option>
            <option value="follow">Fol. Up</option>
            <option value="noCourse">!Course</option>
            <option value="started">Started</option>
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
            value={filterByStage}
            onChange={(e) => {
              console.log(e.target.value)
              setfilterByStage(e.target.value);
            }}
          >
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
