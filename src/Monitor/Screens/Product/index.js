import axios from "axios";
import React, { useState } from "react";
import styles from "./style.module.css";
import MONITOR_BACKEND from "../../Utils/index";
import { AiOutlineDelete } from "react-icons/ai";
import Sidebar from "../../Components/Sidebar";

const Product = ({ products, getProducts }) => {
  const [handler, setHandler] = useState({
    name: "",
    email: "",
  });
  const [phone, setPhone] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const addNewProduct = () => {
    if (handler.name.length > 0) {
      axios
        .post(`${MONITOR_BACKEND}/addProduct`, { ...handler, phone })
        .then((response) => {
          console.log(response);
          if (response) {
            setHandler({ name: "", email: "" });
            setPhone("");
            getProducts();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.home}>
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "88vw",
        }}
      >
        <h1
          style={{
            color: "white",
            alignSelf: "start",
            fontSize: "2.25rem",
            padding: "2rem 1rem 0rem 1rem",
          }}
        >
          Product Team
        </h1>
        <div className={styles.addAgent}>
          <input
            type="text"
            placeholder="Enter name"
            value={handler?.name}
            onChange={(e) => setHandler({ ...handler, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter email"
            value={handler?.email}
            onChange={(e) => setHandler({ ...handler, email: e.target.value })}
          />
          <input
            type="number"
            value={phone}
            placeholder="Enter phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addNewProduct();
            }}
          >
            Save Team
          </button>
        </div>
        <div className={styles.table}>
          <div className={styles.agent}>
            <p className={styles.id}>S. No.</p>
            <p className={styles.name}>Name</p>
            <p className={styles.email}>Email</p>
            <p className={styles.phone}>Phone</p>
          </div>
        </div>
        <div className={styles.usersTable}>
          {products?.map((product, i) => {
            return (
              <div key={i}>
                <div
                  className={styles.agents}
                  onClick={() => setShowDelete(!showDelete)}
                >
                  <p className={styles.id}>{i+1}</p>
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.email}>{product.email}</p>
                  <p className={styles.phone}>{product.phone}</p>
                </div>
                <div
                  style={
                    showDelete
                      ? {
                          display: "flex",
                          justifyContent: "end",
                          margin: "0 2rem",
                        }
                      : { display: "none" }
                  }
                >
                  <AiOutlineDelete
                    color="white"
                    style={{ cursor: "pointer" }}
                    size={20}
                    onClick={(e) => {
                      e.preventDefault();
                      axios
                        .delete(`${MONITOR_BACKEND}/deleteProduct`, {
                          headers: {
                            Authorization: "***",
                          },
                          data: {
                            id: product._id,
                          },
                        })
                        .then((res) => {
                          if (res) {
                            getProducts();
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
