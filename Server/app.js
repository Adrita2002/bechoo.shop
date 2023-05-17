require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const shortid = require("shortid");
mongoose.set("strictQuery", false);
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cors = require("cors");
require("./db/conn");
const protect = require("./middlewares/middleware");
const User = require("./db/models/userDetails");
const Product = require("./db/models/productDetails");
const Cart = require("./db/models/cartDetails");
const { JWT_SECRET } = require("./utils");
const generatePresignedUrl = require("./s3");

app.use(cors());
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
          userId: user._id,
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
    console.log(userProduct, "product");
    res.status(200).json(userProduct);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err.message);
  }
});

//-----Fetch all Product Details-----
app.get("/products/get", (req, res) => {
  Product.find((err, data) => {
    if (err) {
      res.status(500).json(err.message);
    } else {
      res.status(201).json(data);
    }
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//----Fetch all the unique categories
app.get("/products/get/category", async (req, res) => {
  try {
    const productCategory = await Product.distinct("category");
    res.status(200).json(productCategory);
    console.log(productCategory, "....Category");
  } catch (error) {
    res.status(500).json(error);
  }
});

//----Fetch all products of a particular category----
app.get("/category/products/:categoryname", async (req, res) => {
  try {
    console.log(req.params, "...params");
    const category = req.params.categoryname;
    const productCategory = await Product.find({ category: category });
    console.log(productCategory, "product category");
    res.status(200).json(productCategory);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err.message);
  }
});

//---fetch individual item details
app.get("/individual/item/get/:userid", (req, res) => {
  const id = req.params.userid;
  Product.find({ _id: id })
    .populate("userId")
    .then((p) => {
      res.status(200).json(p);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//----Add items to cart----
app.post("/post/cart/add", (req, res) => {
  try {
    const cart = new Cart({
      userId: req.body.userId,
      productId: req.body.productId,
    });
    cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
  }
});

//----Fetch items added to cart by a user----
app.get("/cart/items/get/:userId", (req, res) => {
  const id = req.params.userId;
  Cart.find({ userId: id })
    .populate("productId")
    .then((p) => {
      res.status(200).json(p);
      // console.log(p, "cart items.....");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//----Payment Integration----
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//Create order
app.post("/payment", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
  }
});

//payment verification
app.post("/paymentverification", async (req, res) => {
  // console.log(req.body, "....................payment info");
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    // console.log("sig received", razorpaySignature);
    // console.log("sig generated", expectedSignature);
    if (expectedSignature == razorpaySignature) {
      // console.log("payment is successful");
      return res.redirect(
        `http://localhost:8000/paymentsuccess?refernce=${razorpayPaymentId}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      data: err,
    });
  }
});

app.get("/getkey", (req, res) => {
  try {
    const key = process.env.RAZORPAY_KEY_ID;
    res.status(200).json(key);
  } catch (err) {
    res.status(500).json(err);
  }
});

mongoose.set("strictQuery", false);
