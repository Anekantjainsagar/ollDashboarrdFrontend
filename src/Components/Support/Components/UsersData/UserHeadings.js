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
        <p className="type">Type</p>
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
              setfilter({ ...filter, priority: e.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="Urg">Urgant</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
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
              setfilter({ ...filter, stage: e.target.value });
            }}
          >
            <option className="new" value="all">
              All
            </option>
            <option className="new" value="new">
              New
            </option>
            <option className="posted" value="posted">
              Posted
            </option>
            <option className="onBoarded" value="onBoarded">
              Onboarded
            </option>
            <option className="notFound" value="notFound">
              Not Found
            </option>
            <option className="readyToTeach" value="readyToTeach">
              Ready to teach
            </option>
            <option className="requested" value="requested">
              Requested
            </option>
            <option className="added" value="added">
              Added
            </option>
            <option className="batchReady" value="batchReady">
              Batch Ready
            </option>
            <option className="noTeacher" value="noTeacher">
              No Teacher
            </option>
            <option className="verifying" value="verifying">
              Verifying
            </option>
            <option className="courseReady" value="courseReady">
              Course Ready
            </option>
            <option className="noBatch" value="noBatch">
              No Batch
            </option>
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
