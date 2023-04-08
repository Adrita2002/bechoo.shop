import React from "react";
import "./Individual.css";
import { Paper, Button } from "@mui/material";
const IndividualCards = (props) => {
  return (
    <Paper style={{ backgroundColor: "black" }} className="paper">
      <div className="card">
        <img src={props?.pic} alt="image" />
      </div>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
};

export default IndividualCards;
