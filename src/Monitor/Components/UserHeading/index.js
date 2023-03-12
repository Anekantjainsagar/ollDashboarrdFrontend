import React from "react";
import styles from "./style.module.css";
import { BsChevronDown } from "react-icons/bs";

const UserHeading = ({ filter, setFilter, agents, offers }) => {
  return (
    <div className={styles.bar}>
      <p className={styles.id}>ID</p>
      <p className={styles.inqDate}>Inquiry Date</p>
      <p className={styles.name}>Name</p>
      <p className={styles.type}>
        Stage
        <BsChevronDown size={15} />
        <select
          style={{
            width: "15%",
            position: "relative",
            right: "17.5%",
            zIndex: 1,
            opacity: 0,
            backgroundColor: "transparent",
            paddingLeft: "0.5rem",
          }}
          value={filter.stage}
          onChange={(e) => setFilter({ ...filter, stage: e.target.value })}
        >
          <option style={{ fontSize: "1.5rem", color: "#fff" }} value="all">
            All
          </option>
          <option className="hot" value="hot">
            🔥 Hot
          </option>
          <option className="warm" value="warm">
            🥵 Warm
          </option>
          <option className="cold" value="cold">
            🥶 Cold
          </option>
          <option className="won" value="won">
            🥳 Won
          </option>
        </select>
      </p>
      <p className={styles.phone}>
        Source
        <BsChevronDown size={15} />
        <select
          style={{
            width: "15%",
            position: "relative",
            right: "17.5%",
            zIndex: 1,
            opacity: 0,
            backgroundColor: "transparent",
            paddingLeft: "0.5rem",
          }}
          value={filter.source}
          onChange={(e) => setFilter({ ...filter, source: e.target.value })}
        >
          <option style={{ fontSize: "1.5rem", color: "#fff" }} value="all">
            All
          </option>
          <option value="Event">Event</option>
          <option value="Email">Email</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Referral">Referral</option>
          <option value="Word of Mouth">Word of Mouth</option>
          <option value="Digital">Digital</option>
        </select>
      </p>
      <p className={styles.offerDetails}>
        Offer Details
        <BsChevronDown size={15} />
        <select
          style={{
            width: "15%",
            position: "relative",
            right: "17.5%",
            zIndex: 1,
            opacity: 0,
            backgroundColor: "transparent",
            paddingLeft: "0.5rem",
          }}
          value={filter.offer}
          onChange={(e) => setFilter({ ...filter, offer: e.target.value })}
        >
          <option style={{ fontSize: "1.5rem", color: "#fff" }} value="all">
            All
          </option>
          {offers?.map((offer, i) => {
            return (
              <option
                key={i}
                style={{ fontSize: "1.5rem", color: "#fff" }}
                value={offer.name}
              >
                {offer.name}
              </option>
            );
          })}
        </select>
      </p>
      <p className={styles.status}>
        Status
        <BsChevronDown size={15} />
        <select
          style={{
            width: "15%",
            position: "relative",
            right: "17.5%",
            zIndex: 1,
            opacity: 0,
            backgroundColor: "transparent",
            paddingLeft: "0.5rem",
          }}
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option style={{ fontSize: "1.5rem", color: "#fff" }} value="all">
            All
          </option>
          <option className={styles.New} value="New">
            New
          </option>
          <option className={styles.FollowUp} value="FollowUp">
            Follow Up
          </option>
          <option className={styles.Started} value="Started">
            Started
          </option>
        </select>
      </p>
      <p className={styles.cmnt}>Comment</p>
      <p className={styles.handler}>
        Handler
        <BsChevronDown size={15} />
        <select
          style={{
            width: "15%",
            position: "relative",
            right: "17.5%",
            zIndex: 1,
            opacity: 0,
            backgroundColor: "transparent",
            paddingLeft: "0.5rem",
          }}
          value={filter.handler}
          onChange={(e) => setFilter({ ...filter, handler: e.target.value })}
        >
          <option style={{ fontSize: "1.5rem", color: "#fff" }} value="all">
            All
          </option>
          {agents?.map((agent, i) => {
            return (
              <option
                key={i}
                style={{ fontSize: "1.5rem", color: "#fff" }}
                value={agent.name}
              >
                {agent.name}
              </option>
            );
          })}
        </select>
      </p>
      <p className={styles.cmnt}>Deadline</p>
    </div>
  );
};

export default UserHeading;
