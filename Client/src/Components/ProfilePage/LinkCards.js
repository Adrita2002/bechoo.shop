import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
const LinkCards = (props) => {
  return (
    <div className="link-cards">
      <div className="item-pic">
        <img src={props.pics} />
      </div>
      {props.title}
    </div>
  );
};

export default LinkCards;
