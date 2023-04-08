import React, { useState, useEffect } from "react";
import "./Individual.css";
import { useParams } from "react-router-dom";
import IndividualCards from "./IndividualCards";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import axios from "axios";
const Individual = () => {
  const { userId } = useParams();
  const [item, setItem] = useState([]);
  const [details, setDetails] = useState({});
  const [user, setUser] = useState({});
  // let item = [];
  useEffect(() => {
    (async () => {
      axios
        .get(`http://localhost:8000/individual/item/get/${userId}`)
        .then((res) => {
          console.log(res.data[0].images, "res.data");
          const allItems = [];
          res.data[0].images.forEach((element) => {
            allItems.push(element);
          });
          setItem(allItems);
          console.log(item, "images");
          // console.log(res.data[0].name);
          const allDetails = {
            name: res.data[0].name,
            price: res.data[0].price,
            brand: res.data[0].brand,
            category: res.data[0].category,
            desc: res.data[0].desc,
          };
          setDetails(allDetails);
          // console.log(details, "details");

          const userDetails = {
            name: res.data[0].userId.name,
            email: res.data[0].userId.email,
            phone: res.data[0].userId.phone,
          };
          setUser(userDetails);
          // console.log(user, "user info");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <div className="itembody">
      <div className="random-filler">
        Name : {details.name}. Price : {details.price}. Brand : {details.brand}.
        Category : {details.category}
      </div>
      <Carousel className="carousel">
        {item.map((it) => (
          <IndividualCards className="i-card" pic={it} />
        ))}
      </Carousel>
      <Grid className="grid" container spacing={3}>
        <Grid item xs={8}>
          <div className="grid-item">
            <h1 className="head1">{details.name}</h1>

            <p className="p1">Category - {details.category}</p>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="grid-item" id="g2">
            <h1>Price - Rs. {details.price}</h1>
            <div className="button">
              <button>Order Now</button>
            </div>
            <div className="button">
              <button>Add to Cart</button>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="grid-item">
            <h1 className="head1">Description</h1>

            <p className="p1">{details.desc}</p>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="grid-item">
            <h1>Seller - {user.name}</h1>
            <h3>Email - {user.email}</h3>

            <h3>Phone Number - {user.phone}</h3>
            <div className="button">
              <button>Chat Now</button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Individual;
