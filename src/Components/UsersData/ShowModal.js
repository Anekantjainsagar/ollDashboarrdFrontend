import React from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/Modal.css";
import { css } from "glamor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowModal = ({
  setIsOpen,
  modalIsOpen,
  clickedTemplate,
  templateUser,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "40%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      padding: "1rem 2rem",
      borderRadius: "1rem",
      backgroundColor: "#000",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  return clickedTemplate ? (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      id="modal"
    >
      <div className="header">
        <h2>{clickedTemplate.elementName}</h2>
        <AiOutlineClose
          onClick={closeModal}
          color={"#fff"}
          style={{ cursor: "pointer" }}
          size={20}
        />
      </div>
      <div className="body">
        <p className="msg">{clickedTemplate.body}</p>
        {clickedTemplate.customParams.length > 0
          ? clickedTemplate.customParams.map((e, index) => {
              return (
                <div className="input">
                  <p className="heading">
                    {index + 1 + ".  " + e.paramName + " :"}
                  </p>
                  <input type="text" className={e.paramName} />
                </div>
              );
            })
          : null}
        <button
          className="btn"
          onClick={() => {
            clickedTemplate.customParams.map((e, index) => {
              const test = document.querySelector(`.${e.elementName}`);
              console.log(test);
              return 0;
            });
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "text/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzIyYzViYi1kYzQwLTRmODctYjZiMi1iMjMyOTQyMjBiOGUiLCJ1bmlxdWVfbmFtZSI6ImluZm9Ab2xsLmNvIiwibmFtZWlkIjoiaW5mb0BvbGwuY28iLCJlbWFpbCI6ImluZm9Ab2xsLmNvIiwiYXV0aF90aW1lIjoiMDgvMDEvMjAyMiAwNDowMDo1NiIsImRiX25hbWUiOiIxMTUwNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.k89dQ0gkjcZ3T8VYDz6FIbr4sisaSiSTvjLZ7FhLEAc",
              },
              body: JSON.stringify({
                parameters: [{ name: "name", value: `${templateUser.name}` }],
                template_name: `${clickedTemplate.elementName}`,
                broadcast_name: "test1",
              }),
            };
            fetch(
              `https://live-server-11507.wati.io/api/v1/sendTemplateMessage?whatsappNumber=${
                (templateUser.cCode === undefined
                  ? "+91"
                  : templateUser.cCode) + templateUser.phone
              }`,
              options
            )
              .then((response) => response.json())
              .then((res) => {
                console.log(res);
                const notify = () =>
                  toast(
                    res.result
                      ? `Message send successfully to the ${
                          (templateUser.cCode === undefined
                            ? "+91"
                            : templateUser.cCode) + templateUser.phone
                        }`
                      : res.info,
                    {
                      type: res.result ? "success" : "error",
                    }
                  ).configure({
                    bodyClassName: css({
                      backgroundColor: "blue",
                      height: "100%",
                      width: "100%",
                    }),
                  });
                if (res.result) {
                  setTimeout(() => {
                    closeModal();
                  }, 100);
                }
                notify();
              })
              .catch((err) => console.error(err));
          }}
        >
          Send Message
        </button>
      </div>
    </Modal>
  ) : null;
};

export default ShowModal;
