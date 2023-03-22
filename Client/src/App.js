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
        </Route>
      </Routes>
      {pathname == "/login" || pathname == "/register" ? "" : <SellBar />}
    </div>
  );
}

export default App;
