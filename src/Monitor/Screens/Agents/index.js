import axios from "axios";
import React, { useState } from "react";
import styles from "./style.module.css";
import MONITOR_BACKEND from "../../Utils/index";
import { AiOutlineDelete } from "react-icons/ai";
import Sidebar from "../../Components/Sidebar";

const Agents = ({ agents, getAgents }) => {
  const [handler, setHandler] = useState({
    name: "",
    email: "",
  });
  const [phone, setPhone] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const addNewAgent = () => {
    if (handler.name.length > 0) {
      axios
        .post(`${MONITOR_BACKEND}/addAgent`, { ...handler, phone })
        .then((response) => {
          console.log(response);
          if (response) {
            setHandler({ name: "", email: "" });
            setPhone("");
            getAgents();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.home}>
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "88vw",
        }}
      >
        <h1
          style={{
            color: "white",
            alignSelf: "start",
            fontSize: "2.25rem",
            padding: "2rem 1rem 0rem 1rem",
          }}
        >
          Agents
        </h1>
        <div className={styles.addAgent}>
          <input
            type="text"
            placeholder="Enter agent name"
            value={handler?.name}
            onChange={(e) => setHandler({ ...handler, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter email"
            value={handler?.email}
            onChange={(e) => setHandler({ ...handler, email: e.target.value })}
          />
          <input
            type="number"
            value={phone}
            placeholder="Enter phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addNewAgent();
            }}
          >
            Save Agent
          </button>
        </div>
        <div className={styles.table}>
          <div className={styles.agent}>
            <p className={styles.id}>S. No.</p>
            <p className={styles.name}>Name</p>
            <p className={styles.email}>Email</p>
            <p className={styles.phone}>Phone</p>
          </div>
        </div>
        <div className={styles.usersTable}>
          {agents?.map((agent, i) => {
            return (
              <div key={i}>
                <div
                  className={styles.agents}
                  onClick={() => setShowDelete(!showDelete)}
                >
                  <p className={styles.id}>{i + 1}</p>
                  <p className={styles.name}>{agent.name}</p>
                  <p className={styles.email}>{agent.email}</p>
                  <p className={styles.phone}>{agent.phone}</p>
                </div>
                <div
                  style={
                    showDelete
                      ? {
                          display: "flex",
                          justifyContent: "end",
                          margin: "0 2rem",
                        }
                      : { display: "none" }
                  }
                >
                  <AiOutlineDelete
                    color="white"
                    style={{ cursor: "pointer" }}
                    size={20}
                    onClick={(e) => {
                      e.preventDefault();
                      axios
                        .put(`${MONITOR_BACKEND}/deleteComment`, {
                          id: agent._id,
                        })
                        .then((res) => {
                          if (res) {
                            getAgents();
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Agents;
