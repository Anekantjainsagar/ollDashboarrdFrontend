import React, { useRef } from "react";
import User from "./User";
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
  templateMsg,
  setdata,
  sales,
}) => {
  const usersRef = useRef(null);
  const userData = usersRef.current;

  const scrollTop = () => {
    userData.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="usersData" ref={usersRef}>
        <FaArrowCircleUp className="scrollTop" size={20} onClick={scrollTop} />
        <UserHeading filter={filter} setfilter={setfilter} />
        <div style={{ margin: "2.5rem 0" }}></div>
        <>
          {usersData?.length >= 0 ? (
            usersData.map((e, index) => {
              console.log(e);
              return (
                <User
                  getUserData={getUserData}
                  usersData={usersData}
                  data={e}
                  key={index}
                  index={index}
                  templateMsg={templateMsg}
                  setdata={setdata}
                  noOfUsers={noOfUsers}
                  sales={sales}
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
