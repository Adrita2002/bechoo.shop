import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Grid, Button } from "@mui/material";
import "./Register.css";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/registeruser", {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
      })
      .then((res) => {
        console.log("Data sent", res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <Card className="register-card">
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Name"
                placeholder="Enter your Name"
                className="register-input"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                variant="outlined"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Email"
                placeholder="Enter Institute ID"
                className="register-input"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                variant="outlined"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Phone number"
                placeholder="Enter Phone Number"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="register-input"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <TextField
                label="Enter Password"
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="register-input"
                variant="outlined"
                type="password"
                fullWidth
              />
            </Grid>

            <Grid xs={12} sm={12} item>
              <Button
                variant="contained"
                color="success"
                center
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
