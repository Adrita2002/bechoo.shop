import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const LinkCards = (props) => {
  const navigate = useNavigate();
  return (
    <div className="link-cards" onClick={() => navigate(`${props?.link}`)}>
      <div className="item-pic">
        <img src={props?.pic} />
      </div>
      <h3>{props?.title}</h3>
    </div>
  );
};

export default LinkCards;
