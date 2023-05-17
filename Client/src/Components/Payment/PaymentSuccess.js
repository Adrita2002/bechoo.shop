import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./PaymentSuccess.css";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="payment">
      <h1 id="title-success">PAYMENT COMPLETE</h1>
      <h2>Your order is successful</h2>
      <Button variant="contained" color="success" onClick={() => navigate("/")}>
        Go to Home Page
      </Button>
    </div>
  );
};

export default PaymentSuccess;
