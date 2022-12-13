import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import "../../../../css/filters.css";
import "./index.css";

const UserHeadings = ({ filter, setfilter }) => {
  return (
    <>
      <div className="userOperationHeadings">
        <p>RID</p>
        <p>Raise Date</p>
        <p>Course</p>
        <p>Mode</p>
        <p>Location</p>
        <p>
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
              setfilter({ ...filter, stage: e.target.value });
            }}
          >
            <option className="new" value="all">
              All
            </option>
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
        <p>Actions</p>
        <p>Assignee</p>
      </div>
    </>
  );
};

export default UserHeadings;
