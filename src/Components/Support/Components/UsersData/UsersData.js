import React, { useEffect, useRef, useState } from "react";
import User from "./User";
import "./index.css";
import UserHeading from "./UserHeadings";
import { ThreeDots } from "react-loader-spinner";
import { FaArrowCircleUp } from "react-icons/fa";
import Pagination from "./Pagination";

const UsersData = ({
  usersData,
  getUserData,
  filter,
  setfilter,
  page,
  setpage,
  noOfUsers,
  setdata,
  templateMsg,
  sales,
}) => {
  const usersRef = useRef(null);
  const userData = usersRef.current;

  const scrollTop = () => {
    userData.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="usersDataOfOperation"
        ref={usersRef}
        style={{ height: "76vh" }}
      >
        <FaArrowCircleUp className="scrollTop" size={20} onClick={scrollTop} />
        <UserHeading filter={filter} setfilter={setfilter} />
        <div style={{ margin: "2.5rem 0" }}></div>
        <>
          {usersData?.length >= 0 ? (
            usersData.map((e, index) => {
              return (
                <User
                  getUserData={getUserData}
                  usersData={usersData}
                  data={e}
                  key={index}
                  index={index}
                  templateMsg={templateMsg}
                  setdata={setdata}
                  sales={sales}
                  noOfUsers={noOfUsers}
                />
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <ThreeDots color="#fff" height={80} width={80} />
            </div>
          )}
          <Pagination page={page} setpage={setpage} NoOfUsers={noOfUsers} />
        </>
      </div>
    </>
  );
};

export default UsersData;
