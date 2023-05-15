import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import "./Cart.css";
const CartPage = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      (async () => {
        axios
          .get(`http://localhost:8000/cart/items/get/${userId}`)
          .then((res) => {
            console.log(res.data, "res data of sale");
            const allProducts = [];
            res.data.forEach((element) => {
              allProducts.push(element.productId);
            });
            setProduct(allProducts);
            console.log(product, "cart items");
          })
          .catch((err) => {
            console.log(err, "error");
          });
      })();
    }
  }, []);

  return (
    <div className="cartitems">
      <h1>Items Added to Cart</h1>
      <div className="description">
        {product.map((data) => {
          return (
            <CartItem
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

export default CartPage;
