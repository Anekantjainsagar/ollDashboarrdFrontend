import React, { useState } from "react";
import styles from "./style.module.css";
import ShowSchoolDetails from "../ShowSchoolDetails/index";
import array from "../../Screens/Database/array";

const DbUserBar = ({ school, getSchools }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {school ? (
        <>
          <ShowSchoolDetails
            modalIsOpen={modalIsOpen}
            openModal={openModal}
            setIsOpen={setIsOpen}
            schools={school}
            getSchools={getSchools}
          />
          <div
            className={styles.headings}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <p className={styles.checkBox} onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                {...(array.includes("all") ? "checked" : null)}
                onChange={(e) => {
                  if (array.includes(school?._id)) {
                    const index = array.indexOf(school?._id);
                    array.splice(index, 1);
                  } else {
                    array.push(school?._id);
                  }
                }}
              />
            </p>
            <p>{school?.id}</p>
            <p className={styles.school}>{school?.name}</p>
            <p className={styles.type}>{school?.type}</p>
            <p className={styles.board}>{school?.board}</p>
            <p className={styles.trustee}>{school?.email}</p>
            <p className={styles.coordinator}>{school?.phone}</p>
            <p className={styles.location}>{school?.city}</p>
            <p className={styles.principal}>
              {school["Principal Name"]
                ? school["Principal Name"]
                : school?.principal?.name}
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DbUserBar;
