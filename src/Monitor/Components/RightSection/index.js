import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";

import NewLead from "../NewLead/index";
import UserHeading from "../UserHeading/index";
import UserBar from "../UserBar/index";
import FollowUp from "../../Components/FollowUp/index";
import Meetings from "../../Components/Meetings/index";
import B2BContext from "../../Context/B2BContext";
import { useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";
import MONITOR_BACKEND from "../../Utils";
import "jspdf-autotable";
import jsPDF from "jspdf";

const RightSection = ({
  schools,
  getSchools,
  getUsers,
  page,
  setPage,
  noOfUsers,
  meetings,
  getMeetings,
  followUp,
  getFollowUps,
  getOffers,
  agents,
  offers,
  getPrograms,
  programs,
  filter,
  setFilter,
  filteredUsers,
  search,
  setSearch,
}) => {
  const b2b = useContext(B2BContext);
  const location = useLocation();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (b2b?.login?.type === "b2b") {
      if (b2b?.login?.name !== "Vidushi") {
        setUser(b2b?.login?.name);
      }
    }
  }, [location.pathname]);

  const [b2bUser, setB2bUser] = useState([]);
  const [date, setDate] = useState("2023-01-01");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const downloadData = () => {
    axios.get(`${MONITOR_BACKEND}/getAllUsers`).then((res) => {
      const data = res.data.filter((e) => {
        return (
          new Date(e.inqDate) >= new Date(date) &&
          new Date(e.inqDate) <= new Date(currentDate)
        );
      });
      setB2bUser(data);
    });
  };

  useEffect(() => {
    downloadData();
  }, []);

  const print = () => {
    const pdf = new jsPDF("p", "pt", "a4");

    const columns = ["Time", "Name", "Email", "Phone"];
    var rows = [];

    pdf.text(
      225,
      40,
      `FollowUps (${
        followUp?.filter((follow) => {
          return (
            new Date(Date.now()).toString().slice(4, 16) ===
            new Date(follow.startDate).toString().slice(4, 16)
          );
        }).length
      })`,
      {
        halign: "center",
        valign: "middle",
      }
    );
    followUp
      ?.filter((follow) => {
        return (
          new Date(Date.now()).toString().slice(4, 16) ===
          new Date(follow.startDate).toString().slice(4, 16)
        );
      })
      .map((e, i) => {
        const sch = schools?.filter((school) => {
          return e?.name === school?.name;
        });
        console.log(sch);
        var temp = [
          new Date(e?.startDate).toString().slice(4, 16) + e?.time,
          e?.name,
          sch[0]?.email,
          sch[0]?.phone,
        ];
        rows.push(temp);
      });

    pdf.autoTable(columns, rows, {
      startY: 55,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        fillColor: [166, 204, 247],
      },
    });

    const meetColumns = ["Time", "Name", "URL"];
    var meetRows = [];

    pdf.text(
      225,
      410,
      `Meetings (${
        meetings.filter((meet) => {
          return (
            new Date(Date.now()).toString().slice(4, 16) ===
            new Date(meet.startDate).toString().slice(4, 16)
          );
        }).length
      })`,
      {
        halign: "center",
        valign: "middle",
      }
    );
    meetings
      .filter((meet) => {
        return (
          new Date(Date.now()).toString().slice(4, 16) ===
          new Date(meet.startDate).toString().slice(4, 16)
        );
      })
      .map((e, i) => {
        var temp = [
          new Date(e?.startDate).toString().slice(4, 16) + e?.time,
          e?.name + " (" + e?.type + ")",
          e?.link,
        ];
        meetRows.push(temp);
      });

    pdf.autoTable(meetColumns, meetRows, {
      startY: 430,
      theme: "grid",
      styles: {
        font: "times",
        halign: "center",
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        fillColor: [166, 204, 247],
      },
    });

    pdf.save("Report");
  };

  return (
    <div className={styles.mainPanel}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className={styles.mainHead}>Leads</h1>
        <div
          style={{
            width: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <input
            type="date"
            style={{ width: "30%" }}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              downloadData();
            }}
          />
          <CSVLink
            data={b2bUser}
            filename="B2BUsers"
            className={styles.btns}
            onClick={() => {
              downloadData();
            }}
          >
            Export
          </CSVLink>
          <input
            type="date"
            style={{ width: "30%" }}
            value={currentDate}
            onChange={(e) => {
              setCurrentDate(e.target.value);
              downloadData();
            }}
          />
        </div>
        <input
          type="text"
          style={{ width: "30%" }}
          placeholder="Search by School name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <NewLead
        schools={schools}
        getSchools={getSchools}
        getUsers={getUsers}
        agents={agents}
        offers={offers}
      />
      <div className={styles.usersDisplay}>
        <UserHeading
          filter={filter}
          setFilter={setFilter}
          agents={agents}
          offers={offers}
        />
        <div className={styles.usersDisplayContainer}>
          {filteredUsers
            ?.filter((e) => {
              if (user?.length > 0) {
                return e.handler.toLowerCase().includes(user.toLowerCase());
              }
              return e;
            })
            .map((user, i) => {
              return (
                <UserBar
                  user={user}
                  key={i}
                  schools={schools}
                  getUsers={getUsers}
                  getMeetings={getMeetings}
                  getFollowUps={getFollowUps}
                  getOffers={getOffers}
                  getPrograms={getPrograms}
                  programs={programs}
                  followUp={followUp}
                />
              );
            })}
          {noOfUsers ? (
            noOfUsers <= page * 10 ? null : (
              <div
                className={styles.loadBtn}
                style={{ fontSize: "1.65rem", width: "42%" }}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Show more
              </div>
            )
          ) : null}
        </div>
      </div>
      <div className={styles.blocks}>
        <FollowUp
          getFollowUps={getFollowUps}
          followUp={followUp}
          schools={schools}
          getUsers={getUsers}
        />
        <Meetings meetings={meetings} getMeetings={getMeetings} />
        <div className={styles.report}>
          <div className={styles.header}>
            <h1>Report</h1>
            <button
              style={{ padding: "0.2rem 0.75rem", fontSize: "1.3rem" }}
              onClick={(e) => {
                e.preventDefault();
                print();
              }}
            >
              Download
            </button>
          </div>
          <div className={styles.data}>
            <p>No of leads :- {noOfUsers}</p>
            <p>
              No of followups :-{" "}
              {
                followUp?.filter((follow) => {
                  return (
                    new Date(Date.now()).toString().slice(4, 16) ===
                    new Date(follow.startDate).toString().slice(4, 16)
                  );
                }).length
              }
            </p>
            <p>
              No of meetings :-{" "}
              {
                meetings.filter((meet) => {
                  return (
                    new Date(Date.now()).toString().slice(4, 16) ===
                    new Date(meet.startDate).toString().slice(4, 16)
                  );
                }).length
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
