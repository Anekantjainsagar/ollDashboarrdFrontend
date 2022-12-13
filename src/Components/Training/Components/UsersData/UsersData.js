import React, { useEffect, useRef, useState } from "react";
import User from "./User";
import UserHeading from "./UserHeadings";
import { ThreeDots } from "react-loader-spinner";
import { FaArrowCircleUp } from "react-icons/fa";
import Pagination from "./Pagination";
import "./index.css";

const UsersData = ({
  getRequirements,
  requirementsData,
  usersData,
  filter,
  setfilter,
  page,
  setpage,
  noOfUsers,
  setdata,
  templateMsg,
  getUserData,
  sales,
  filteredData,
}) => {
  const usersRef = useRef(null);
  const userData = usersRef.current;

  const scrollTop = () => {
    userData.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="usersDataOfOperation" ref={usersRef}>
        <FaArrowCircleUp className="scrollTop" size={20} onClick={scrollTop} />
        <UserHeading filter={filter} setfilter={setfilter} />
        <div style={{ margin: "2rem 0" }}></div>
        <>
          {filteredData?.length >= 0 ? (
            filteredData?.map((e, index) => {
              return (
                <User
                  getRequirements={getRequirements}
                  requirementsData={requirementsData}
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
