import React, { useState, useEffect } from "react";
import axios from "axios";
import SaleItem from "./SaleItem";
import "./Sale.css";
const ItemsOnSale = () => {
  // const [userId, setUserId] = useState("");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     (async () => {
  //       axios
  //         .get("/user/info", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((res) => {
  //           if (res.data.data) {
  //             //   console.log(res.data.data);
  //             // setUserId(res.data.data._id);
  //           }
  //         });
  //     })();
  //   }
  // }, []);

  const [user, setUser] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      (async () => {
        axios
          .get(`http://localhost:8000/user/onsale/all/${userId}`)
          .then((res) => {
            console.log(res.data, "res data of sale");
            let detailsArr = res.data;
            setUser([...detailsArr]);
            console.log(user, "user");
          })
          .catch((err) => {
            console.log(err, "error");
          });
      })();
    }
  }, []);
  return (
    <div className="itemsonsale">
      <h1>Items On Sale</h1>
      <div className="description">
        {user.map((data) => {
          return (
            <SaleItem
              id={data._id}
              name={data.name}
              price={data.price}
              brand={data.brand}
              category={data.category}
              desc={data.desc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemsOnSale;
