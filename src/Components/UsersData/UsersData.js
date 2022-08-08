import React from "react";
import User from "./User";
import UserHeading from "./UserHeadings";
import { ThreeDots } from "react-loader-spinner";

const UsersData = ({ usersData }) => {
  return (
    <>
      <div className="usersData">
        <UserHeading />
        {usersData ? (
          usersData.map((e, index) => {
            return <User data={e} key={index} />;
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
      </div>
    </>
  );
};

export default UsersData;
