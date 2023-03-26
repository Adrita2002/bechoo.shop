import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LinkCards from "./LinkCards";
import "./Profile.css";
import orderpic from "./orderpics/orderbig.png";
import sellpic from "./sellpic/sellbig.png";
import likedpic from "./likedpics/likedpicsbig.png";
import detailpic from "./detailspic/detailsbig.png";
import Grid from "antd/lib/card/Grid";
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

      <div className="linkcards-area">
        <LinkCards title="Your Orders" pic={orderpic} link="/yourorders" />
        <LinkCards title="Your Details" pic={detailpic} link="/yourdetails" />
        <LinkCards
          title="Items on Sale"
          pic={sellpic}
          link={"/itemsonsale/:" + userDetails._id}
        />
        <LinkCards title="Liked Items" pic={likedpic} link="/likeditems" />
      </div>
    </div>
  );
};

export default Profile;
