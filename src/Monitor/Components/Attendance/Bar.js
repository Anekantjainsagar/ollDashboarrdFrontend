import React, { useContext } from "react";
import styles from "./style.module.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { MdCleaningServices, MdFlight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { VscDash } from "react-icons/vsc";
import B2BContext from "../../Context/B2BContext";

const Bar = ({ data }) => {
  const context = useContext(B2BContext);
  const d = new Date();
  const month = d.getMonth();
  const dates = [
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  ];
  return (
    <>
      <div className={styles.barH}>
        <p style={{ padding: "0.3rem 1rem", whiteSpace: "no-wrap" }}>
          {data?.name}
        </p>
        {dates[month].map((e) => {
          const date = new Date(`${month + 1} ${e}, ${d.getFullYear()}`);
          return (
            <p className={styles.icon}>
              {new Date(
                context?.holiday?.holidays?.find((e) => {
                  return new Date(e?.date)
                    .toString()
                    .slice(0, 15)
                    .includes(date.toString().slice(0, 15));
                })?.date
              )
                .toString()
                .slice(0, 15) === date.toString().slice(0, 15) ||
              date.getDay() === 0 ? (
                <FaStar size={20} />
              ) : new Date(
                  context?.leave?.leaves?.filter((e) => {
                    return (
                      data?.name
                        .toLowerCase()
                        .includes(e?.name.toLowerCase()) &&
                      e?.leaveStatus === "Approved"
                    );
                  })[0]?.leaveDate
                )
                  .toString()
                  .slice(0, 15) === date.toString().slice(0, 15) ? (
                <MdFlight size={20} />
              ) : new Date(
                  data?.present?.find((e) => {
                    return (
                      new Date(e?.date).toString().slice(0, 15) ===
                      date.toString().slice(0, 15)
                    );
                  })?.date
                )
                  ?.toString()
                  .slice(0, 15) === date?.toString().slice(0, 15) ? (
                <TiTick size={20} />
              ) : new Date(
                  data?.absent?.find((e) => {
                    return (
                      new Date(e?.date).toString().slice(0, 15) ===
                      date.toString().slice(0, 15)
                    );
                  })?.date
                )
                  ?.toString()
                  .slice(0, 15) === date?.toString().slice(0, 15) ? (
                <AiOutlineClose size={20} />
              ) : new Date(
                  data?.halfDay?.find((e) => {
                    return (
                      new Date(e?.date).toString().slice(0, 15) ===
                      date.toString().slice(0, 15)
                    );
                  })?.date
                )
                  ?.toString()
                  .slice(0, 15) === date?.toString().slice(0, 15) ? (
                <FaStarHalfAlt size={20} />
              ) : (
                <VscDash size={20} />
              )}
            </p>
          );
        })}
      </div>
      <div className={styles.info}>
        <p>Present :- {data?.present.length}</p>
        <p>Absent :- {data?.absent.length}</p>
        <p>Half Days :- {data?.halfDay.length}</p>
      </div>
    </>
  );
};

export default Bar;
