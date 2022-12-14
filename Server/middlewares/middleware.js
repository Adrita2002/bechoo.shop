const User = require('../db/models/userDetails')
const {JWT_SECRET} = require('../utils');
const jwt = require('jsonwebtoken')
const protect = async (req, res, next) => {
    try {
      const headrs = req.headers;
      let token;
      if (headrs.authorization) {
        token = headrs.authorization.split(" ")[1];
        console.log(token)
        // token = JSON.parse(headrs.authorization.split(" ")[1]);
      }
  
      if (!token) {
        return res.status(400).json({
          status: "fail",
          message: "No token set",
        });
      }
      const decoded= jwt.verify(token, JWT_SECRET);
      console.log(decoded)
      let usr;
      if (decoded.user._id) {
        usr = await User.findById(decoded.user._id);
      }
      if (usr) {
        req.user = usr;
      }
      console.log(req.user,'req.user')
      console.log(usr,"usr")
      if (!req.user) {
        return res.status(400).json({
          status: "fail",
          message: "Please Login again!",
        });
      }
      next();
    } catch (err) {
      console.error("error protect", err);
      return res.status(401).send("Not authorized to access this route");
    }
}

module.exports = protect