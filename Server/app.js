require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const bcrypt = require("bcrypt");

require("./db/conn");
const protect = require("./middlewares/middleware");
const User = require("./db/models/userDetails");
const Product = require("./db/models/productDetails");
const { JWT_SECRET } = require("./utils");
const generatePresignedUrl = require("./s3");

app.use(express.json());
const port = process.env.PORT || 8000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//-----Authentication-----
//Create users through registration
app.post("/registeruser", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    // console.log(req.body)
    // const oldUser = await User.find({email:req.body.email});
    // if(oldUser) return res.send('User exists');
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: encryptedPassword,
    });
    // console.log(user)
    // await user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((err)=>res.status(400).send(err))

    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

//Login User
app.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User does not Exist");
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user }, JWT_SECRET);
      if (res.status(201)) {
        return res.json({
          status: "ok",
          data: token,
          userId: user._id
        });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password" });
  } catch (err) {
    console.log(err);
  }
});

//After login
app.get("/user/info", protect, async (req, res) => {
  try {
    const userID = req.user._id;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({
        status: "Fail",
        message: "User details not found",
      });
    }
    return res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
    console.log(err);
  }
});

//-----Product Details-----

//Image upload
app.post("/s3Url", async (req, res) => {
  const url = await generatePresignedUrl(req, res);
  console.log(url);
  return res.json({ url });
});

//Product db
app.post("/productdetails", (req, res) => {
  // console.log(req.body);
  try {
    // console.log(req.body)
    // const oldUser = await User.find({email:req.body.email});
    // if(oldUser) return res.send('User exists');
    const product = new Product({
      userId: req.body.userId,
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      brand: req.body.brand,
      category: req.body.category,
      other: req.body.other,
      images: req.body.images,
    });
    // console.log(user)
    // await user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((err)=>res.status(400).send(err))

    product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

//---Fetch Data----
app.get("/users/get", (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).json(err.message);
    } else {
      res.status(201).json(data);
    }
  });
});

//---Fetch sold items of a particular user---
app.get("/user/onsale/all/:userId", async (req, res) => {
  try {
    console.log(req.params, "...params");
    const userId = req.params.userId;
    const userProduct = await Product.find({ userId: userId });
    console.log(userProduct);
    res.status(200).json(userProduct);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose.set("strictQuery", false);
