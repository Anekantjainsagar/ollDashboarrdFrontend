import React from "react";
import fileDownload from "js-file-download";
import MONITOR_BACKEND from "../../Utils";
import Axios from "axios";

const ActionButtons = () => {
  return (
    <>
      <p style={{ marginBottom: "0.25rem" }}>Actions : </p>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            Axios({
              url: `${MONITOR_BACKEND}/download/mou`,
              method: "GET",
              responseType: "blob",
            }).then((res) => {
              console.log(res);
              fileDownload(res.data, "mou.docx");
            });
          }}
        >
          Proposal
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            Axios({
              url: `${MONITOR_BACKEND}/download/circular`,
              method: "GET",
              responseType: "blob",
            }).then((res) => {
              console.log(res);
              fileDownload(res.data, "circular.docx");
            });
          }}
        >
          Circular
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            Axios({
              url: `${MONITOR_BACKEND}/download/curriculum`,
              method: "GET",
              responseType: "blob",
            }).then((res) => {
              console.log(res);
              fileDownload(res.data, "curriculum.pdf");
            });
          }}
        >
          Curriculum
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            Axios({
              url: `${MONITOR_BACKEND}/download/brochure`,
              method: "GET",
              responseType: "blob",
            }).then((res) => {
              console.log(res);
              fileDownload(res.data, "brochure.pdf");
            });
          }}
        >
          Brochure
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            Axios({
              url: `${MONITOR_BACKEND}/download/mou`,
              method: "GET",
              responseType: "blob",
            }).then((res) => {
              console.log(res);
              fileDownload(res.data, "mou.docx");
            });
          }}
        >
          MOU
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            Axios({
              url: `${MONITOR_BACKEND}/download/calender`,
              method: "GET",
              responseType: "blob",
            }).then((res) => {
              console.log(res);
              fileDownload(res.data, "calender.xlsx");
            });
          }}
        >
          Calender
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
