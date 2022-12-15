import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bar from "./Bar";
import styles from "./style.module.css";

const ProgramReportDetails = ({ programs, reports, getReports }) => {
  const { id } = useParams();
  const [program, setProgram] = useState();

  useEffect(() => {
    if (programs?.length > 0) {
      const pg = programs?.find((program) => {
        return program._id === id;
      });
      setProgram(pg);
    }
  }, [programs]);
  return (
    <div className={styles.report}>
      <div className={styles.header}>
        <h3>{program?.school}</h3>
        <div>
          <p>
            Offer : <span>{program?.name}</span>
          </p>
          <p>
            Type : <span>{program?.model}</span>
          </p>
        </div>
        <div>
          <p>
            Mode : <span>{program?.mode}</span>
          </p>
        </div>
        <div>
          <p>
            Training : <span>{program?.training}</span>
          </p>
        </div>
        <div>
          <p>
            Payment : <span>{program?.payment}</span>
          </p>
          <p>
            Grades :
            {/* <div>
              {program?.pricing?.map((e, i) => {
                return (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={e.name == i ? true : false}
                    />
                    <p>{e.name}</p>
                  </div>
                );
              })}
            </div> */}
          </p>
        </div>
        <div>
          <p>
            Terms : <span>{program?.terms}</span>
          </p>
          <p>
            Pay Status : <span>Pending</span>
          </p>
        </div>
      </div>
      {reports
        ?.filter((report) => report?.programId === id)
        .sort((a, b) => a.className - b.className)
        .map((report) => {
          return <Bar report={report} getReports={getReports} />;
        })}
    </div>
  );
};

export default ProgramReportDetails;
