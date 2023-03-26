import React, { useState, useEffect } from "react";
import axios from "axios";
const ItemsOnSale = () => {
  // const [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        axios
          .get("/user/info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.data) {
              //   console.log(res.data.data);
              // setUserId(res.data.data._id);
            }
          });
      })();
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      (async () => {
        axios
          .get( `http://localhost:8000/user/onsale/all/${userId}`)
          .then((res) => {
            console.log(res.data, 'res data of sale')
          }).catch((err) => {
            console.log(err, 'error')
          });
      })();
    }
  }, []);
  return <div>ItemsOnSale</div>;
};

export default ItemsOnSale;
