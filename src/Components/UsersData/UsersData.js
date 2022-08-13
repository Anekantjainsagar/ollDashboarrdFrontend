import React, { useEffect, useState } from "react";
import User from "./User";
import UserHeading from "./UserHeadings";
import { ThreeDots } from "react-loader-spinner";

const UsersData = ({ usersData, getUserData }) => {
  const [templateMsg, settemplateMsg] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzIyYzViYi1kYzQwLTRmODctYjZiMi1iMjMyOTQyMjBiOGUiLCJ1bmlxdWVfbmFtZSI6ImluZm9Ab2xsLmNvIiwibmFtZWlkIjoiaW5mb0BvbGwuY28iLCJlbWFpbCI6ImluZm9Ab2xsLmNvIiwiYXV0aF90aW1lIjoiMDgvMDEvMjAyMiAwNDowMDo1NiIsImRiX25hbWUiOiIxMTUwNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.k89dQ0gkjcZ3T8VYDz6FIbr4sisaSiSTvjLZ7FhLEAc",
      },
    };

    fetch(
      "https://live-server-11507.wati.io/api/v1/getMessageTemplates?pageSize=13&pageNumber=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        settemplateMsg(response.messageTemplates);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="usersData">
        <UserHeading />
        {usersData ? (
          usersData.map((e, index) => {
            return (
              <User
                getUserData={getUserData}
                data={e}
                key={index}
                templateMsg={templateMsg}
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
      </div>
    </>
  );
};

export default UsersData;
