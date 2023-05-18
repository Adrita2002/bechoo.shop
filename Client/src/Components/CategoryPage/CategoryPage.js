import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import dataItem from "../Data.json";
import ItemCards from "../ItemCards/ItemCards";
import "./CategoryPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const CategoryPage = () => {
  const { userId } = useParams();
  const [categoryItems, setCategoryItems] = useState([]);
  useEffect(() => {
    (async () => {
      axios
        .get(`http://localhost:8000/category/products/${userId}`)
        .then((res) => {
          console.log(res.data);
          let items = res.data;
          setCategoryItems(items);
          console.log(categoryItems, "cate items");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [userId]);

  return (
    <div className="category-page">
      <h1 className="category-title">Items related to {userId}</h1>
      <Grid container spacing={4}>
        {categoryItems.map((data) => {
          console.log(data);
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

export default CategoryPage;
