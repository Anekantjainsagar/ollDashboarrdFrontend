import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import "../../css/filters.css";

const UserHeadings = ({ filter, setfilter }) => {
  return (
    <>
      <div
        className="userPanelHeadings"
        style={{
          gridTemplateColumns: "5% 8% 10% 9% 10% 10% 12% 12% 9% 6% 11%",
        }}
      >
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
          <select
            className="filterSelector"
            value={filter.class}
            onChange={(e) => {
              console.log(e.target.value);
              setfilter({ ...filter, class: e.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="group Online">group Online</option>
            <option value="group Offline">group Offline</option>
            <option value="1 to 1 Online">1 to 1 Online</option>
            <option value="1 to 1 Offline">1 to 1 Offline</option>
            <option value="Trial Offline">trial Offline</option>
            <option value="Trial Online">trial Online</option>
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
        <p className="assignee">Handler</p>
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
