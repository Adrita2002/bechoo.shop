import React, { useState, useEffect } from "react";
import "./Individual.css";
import { useParams, useNavigate } from "react-router-dom";
import IndividualCards from "./IndividualCards";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import axios from "axios";

const Individual = () => {
  const { userId } = useParams();
  const [item, setItem] = useState([]);
  const [details, setDetails] = useState({});
  const [seller, setSeller] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
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

          const sellerDetails = {
            name: res.data[0].userId.name,
            email: res.data[0].userId.email,
            phone: res.data[0].userId.phone,
          };
          setSeller(sellerDetails);
          // console.log(user, "user info");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

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
              // console.log(res.data.data);
              setUser(res.data.data);
              // console.log(user, "user ID");
            }
          });
      })();
    }
  }, []);
  const handleClick = () => {
    axios
      .post("http://localhost:8000/post/cart/add", {
        userId: user,
        productId: userId,
      })
      .then((res) => {
        console.log("Data sent", res);
        alert("Item Added to Cart");
      })
      .catch((err) => console.log(err));
  };

  //---Payment---
  const checkoutHandler = async () => {
    const dataKey = await axios.get("http://localhost:8000/getkey");

    await axios
      .post("http://localhost:8000/payment", {
        amount: details.price,
      })
      .then((res) => {
        console.log(res, "...payment data");
        var options = {
          key: dataKey.key,
          amount: res.data.order.amount,
          currency: "INR",
          name: "Bechoo",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: res.data.order.id,
          // callback_url: "http://localhost:8000/paymentverification",
          handler: async function (response) {
            const data = {
              orderCreationId: res.data.order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              userId: user._id,
              amount: res.data.order.amount,
              // orderId,
            };
            axios
              .post(`http://localhost:8000/paymentverification`, data)
              .then((res) => {
                navigate(
                  `/paymentsuccess?reference=${response.razorpay_payment_id}`
                );
              })
              .catch((err) => {
                console.log(err);
                alert("Payment Failure");
              });
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#251b37",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              <button onClick={checkoutHandler}>Order Now</button>
            </div>
            <div className="button">
              <button onClick={handleClick}>Add to Cart</button>
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
            <h1>Seller - {seller.name}</h1>
            <h3>Email - {seller.email}</h3>

            <h3>Phone Number - {seller.phone}</h3>
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
