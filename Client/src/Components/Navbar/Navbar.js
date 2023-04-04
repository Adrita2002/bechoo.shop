import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBox from "../SearchBox/SearchBox";
import Fab from "@mui/material/Fab";
import ItemData from "../Data.json";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Categories from "../Categories/Categories";
import Badge from "@mui/material/Badge";
import "./Navbar.css";
const Navbar = () => {
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
              // console.log(res.data.data);
              setUserDetails(res.data.data);
            }
          });
      })();
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  function handleMenu() {}

  return (
    <div className="nav-wrapper">
      <div className="navbar">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          Bechoo
        </div>
        <SearchBox placeholder="Search for items..." data={ItemData} />

        <div className="btn-wrapper">
          <Badge badgeContent={4} color="secondary">
            <ChatBubbleOutlineIcon color="white" />
          </Badge>

          <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon color="white" />
          </Badge>
          <div className="account">
            <Button
              id="basic-button"
              color="success"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {userDetails.name}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                }}
              >
                My account
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <Categories data={ItemData} />
    </div>
  );
};

export default Navbar;
