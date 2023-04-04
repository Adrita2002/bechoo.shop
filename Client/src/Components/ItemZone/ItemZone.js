import React, { useState, useEffect } from "react";
import fire from "./fire.png";
import ItemCards from "../ItemCards/ItemCards";
import Grid from "@mui/material/Grid";
import "./ItemZone.css";
import dataItem from "../Data.json";
import axios from "axios";
const ItemZone = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    (async () => {
      axios
        .get("http://localhost:8000/products/get")
        .then((res) => {
          console.log(res.data);
          let prod = res.data;
          setProduct([...prod]);
          console.log(product, "product");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);
  return (
    <div className="itemZone">
      <h1 className="item-zone">
        Items on Sale <img src={fire} />
      </h1>

      <Grid container spacing={4}>
        {product.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={3}>
              <ItemCards
                id={data._id}
                img={data.images[0]}
                name={data.name}
                price={data.price}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ItemZone;
