import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LinkCards from "./LinkCards";
import "./Profile.css";
import orderpic from "./orderpics/orderbig.png";
import sellpic from "./sellpic/sellbig.png";
import likedpic from "./likedpics/likedpicsbig.png";
import detailpic from "./detailspic/detailsbig.png";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
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
              console.log(res.data.data);
              setUserDetails(res.data.data);
            }
          });
      })();
    }
  }, []);
  return (
    <div className="profile">
      <h1>Hello, {userDetails.name}!</h1>
      <img src={orderpic} />
      <div className="linkcards-area">
        <LinkCards title="Your Orders" pic={orderpic} />
        <LinkCards title="Your Details" pic={detailpic} />
        <LinkCards title="Items on Sale" pic={sellpic} />
        <LinkCards title="Liked Items" pic={likedpic} />
      </div>
    </div>
  );
};

export default Profile;
