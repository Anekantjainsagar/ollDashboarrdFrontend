import React from "react";
import styles from "./style.module.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { MdFlight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { VscDash } from "react-icons/vsc";

const Bar = () => {
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
    <div className={styles.barH}>
      <p style={{ padding: "0.3rem 1rem", whiteSpace: "no-wrap" }}>
        Anekant Jain
      </p>
      <p className={styles.icon}>
        <FaStar size={20} />
      </p>
      <p className={styles.icon}>
        <FaStarHalfAlt size={20} />
      </p>
      <p className={styles.icon}>
        <AiOutlineClose size={20} />
      </p>
      <p className={styles.icon}>
        <MdFlight size={20} />
      </p>
      <p className={styles.icon}>
        <TiTick size={20} fontWeight={900} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
      <p className={styles.icon}>
        <VscDash size={20} />
      </p>
    </div>
  );
};

export default Bar;
