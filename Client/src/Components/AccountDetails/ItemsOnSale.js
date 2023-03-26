import React, { useState, useEffect } from "react";
import axios from "axios";
const ItemsOnSale = () => {
  const [userId, setUserId] = useState("");
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
              setUserId(res.data.data._id);
            }
          });
      })();
    }
  }, []);
  useEffect(() => {
    async function fetchSaleProducts() {
      const response = await axios.get(
        `http://localhost:8000/user/onsale/all/${userId}`
      );
      console.log(response.data);
    }
    fetchSaleProducts();
  }, []);

  return <div>ItemsOnSale</div>;
};

export default ItemsOnSale;
