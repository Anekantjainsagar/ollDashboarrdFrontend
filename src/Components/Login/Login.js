import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../Utils/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ({ setsales }) => {
  const [time, settime] = useState(new Date().toLocaleTimeString());
  const history = useNavigate();

  useEffect(() => {
    setInterval(() => {
      settime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  const [user, setUser] = useState({ email: "", password: "" });
  const [view, setView] = useState(false);

  const postData = async () => {
    if (!user.email || !user.password) {
      console.log("Fill all the details");
    } else {
      await axios
        .post(`${BASE_URL}/login`, {
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          const notify = () =>
            toast(
              res.data.msg === undefined ? "Email doesn't exist" : res.data.msg,
              {
                type:
                  res.status === 200
                    ? "success"
                    : res.status === 202
                    ? "warning"
                    : "error",
              }
            );
          notify();
          console.log(res.data);
          if (res.data.data[0].type === "sales") {
            setTimeout(() => {
              if (res.status === 200) {
                history("/sales");
              }
            }, 500);
            setsales(true);
          } else {
            setTimeout(() => {
              if (res.status === 200) {
                history("/support");
              }
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div style={{ position: "absolute" }}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
      <div className={styles.container}>
        <div className={styles.time}>
          <MdOutlineAccessTimeFilled size={25} color={"grey"} /> {time}
        </div>
        <div className={styles.box}>
          <h1>Welcome Back &#9995;</h1>
          <input
            className={styles.input}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            type="email"
            placeholder="Email"
          />
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              type={(view)?"text":"password"}
              placeholder="Passoword"
              style={{width:"88%"}}
            />
            {view ? (
              <AiOutlineEye
                color="white"
                size={25}
                onClick={() => setView(!view)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <AiOutlineEyeInvisible  
                color="white"
                size={25}
                onClick={() => setView(!view)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          <button className={styles.btn} onClick={postData}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
