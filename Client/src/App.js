import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SearchBox from "./Components/SearchBox/SearchBox";
import SellBar from "./Components/SellBar/SellBar";
import ItemCards from "./Components/ItemCards/ItemCards";
import { makeStyles } from "@mui/material";
import ItemZone from "./Components/ItemZone/ItemZone";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Individual from "./Components/Individual_Item/Individual";
import Error from "./Components/Individual_Item/Error";
import SellForm from "./Components/SellItems/SellForm";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/ProfilePage/Profile";
import PrivateRoutes from "./utils/auth";
import YourOrders from "./Components/AccountDetails/YourOrders";
import YourDetails from "./Components/AccountDetails/YourDetails";
import ItemsOnSale from "./Components/AccountDetails/ItemsOnSale";
import LikedItems from "./Components/AccountDetails/LikedItems";
import CartPage from "./Components/CartPage/CartPage";
import PaymentSuccess from "./Components/Payment/PaymentSuccess";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname == "/login" || pathname == "/register" ? "" : <Navbar />}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="individual" element={<Individual />}>
            <Route path=":userId" element={<Individual />} />
          </Route>
          <Route path="categories" element={<CategoryPage />}>
            <Route path=":userId" element={<CategoryPage />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="sellform" element={<SellForm />} />
          <Route path="/" element={<ItemZone />} />
          <Route path="profile" element={<Profile />} />
          <Route path="yourorders" element={<YourOrders />} />
          <Route path="yourdetails" element={<YourDetails />} />
          <Route path="itemsonsale" element={<ItemsOnSale />}>
            <Route path=":userId" element={<ItemsOnSale />} />
          </Route>
          <Route path="likeditems" element={<LikedItems />} />
          <Route path="cartitems" element={<CartPage />} />
        </Route>
        <Route path="paymentsuccess" element={<PaymentSuccess />} />
      </Routes>
      {pathname == "/login" || pathname == "/register" ? "" : <SellBar />}
    </div>
  );
}

export default App;
