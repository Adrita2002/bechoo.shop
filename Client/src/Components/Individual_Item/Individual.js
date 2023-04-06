import React, { useState, useEffect } from "react";
import "./Individual.css";
import { useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import axios from "axios";
const Individual = () => {
  const { userId } = useParams();
  const [item, setItem] = useState([]);
  // let item = [];
  useEffect(() => {
    (async () => {
      axios
        .get(`http://localhost:8000/individual/item/get/${userId}`)
        .then((res) => {
          console.log(res.data[0].images, "res.data");
          const allItems = res.data[0].images;
          setItem(allItems);
          console.log(item, "images");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {item &&
        item.map((it) => (
          <ImageListItem key={it}>
            <img
              src={`${it}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${it}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="image"
              loading="lazy"
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
};

export default Individual;
