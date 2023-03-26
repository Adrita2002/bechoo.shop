import React, { useState, useEffect } from "react";
import axios from "axios";
import "./YourDetails.css";
const YourDetails = () => {
  const [userDetails, setUserDetails] = useState({});
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
              //   console.log(res.data.data);
              setUserDetails(res.data.data);
            }
          });
      })();
    }
  }, []);

  return (
    <div className="yourdetails">
      <h1>Your Details</h1>
      <div className="details">
        <div className="detail">
          <h4>Name : {userDetails.name}</h4>
        </div>
        <div className="detail">
          <h4>Email : {userDetails.email}</h4>
        </div>
        <div className="detail">
          <h4>Phone : {userDetails.phone}</h4>
        </div>
      </div>
    </div>
  );
};

export default YourDetails;
