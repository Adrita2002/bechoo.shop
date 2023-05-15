import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
const CartItem = (props) => {
  const navigate = useNavigate();
  return (
    <Card className="item-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {props?.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props?.category}
        </Typography>
        <Typography variant="body2">
          <b>Brand : {props?.brand}</b>
          <br />
          {props?.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/individual/${props?.id}`)}
        >
          Visit Item
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
