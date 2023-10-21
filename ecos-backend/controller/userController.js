const express = require('express');
const app=express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const productDatas = require("../models/productModel");
const validator = require("validator");
const schema = require("../models/userModel");
const secretKey = process.env.SECRET_KEY;

// Configure cookie parsing middleware
app.use(cookieParser());


//getting all products without login
const getAllProducts = async (req, res) => {
    try {
      const allProducts = await productDatas.find();
      allProducts.forEach((product) => {
        product.image =  "http://localhost:3000/" + product.image.slice(7);
      });
      res.json(allProducts);
    } catch (error) {
      res.status(404).json({ error: "didnt load" });
      console.log(error);
    }
  };


// user login
const userLogin = async (req, res) => {
  
  try {
    const login = await schema.findOne({ email: req.body.email });
    console.log(login);

    if(login == null) {
      res.status(401).json({ error: "E-mail or password is invalid" });
      return;
    }

    // check user email and password
    if (login.email == req.body.email && login.password == req.body.password) {
      
      // Create a JWT token
      const user = {username: login.username, email: login.email, cart: login.cart, orders: login.orders};
      const token = jwt.sign(user, secretKey, { expiresIn: '5h' });

      // Set the token as a HTTP cookie
      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: true, // Set to true in production (for HTTPS)
        sameSite: 'strict', // Adjust as needed
      });
      
      res.status(201).json({ message: "user logged successfully.....", user, cookie: token });
      return;

    }
    res.status(401).json({ error: "E-mail or password is invalid" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error", error: error.message });
  }
};

// user logout
const userLogout = async (req, res) => {
  
  console.log(req.body.username, "logged out successfully");

  res.json({ message: 'Logged out successfully' });
  
};

// user registration
const userRegister = async (req, res) => {
  //validator check email as email format use in isEmail

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // validate password as 6 character
  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 5 character" });
  }

  if (req.body.password !== req.body.confirmpassword) {
    return res.status(400).json({ error: "Password do not match" });
  }

  try {
    // check if email already exists in the database
    const existingUser = await schema.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.log(req.body);

    await schema.insertMany({
      username: req.body.username,
      // fullname: req.body.fullname,
      // mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ message: "user registered successfully !!..." });
  } catch (error) {
    res.status(500).json({ error: "Server Error", error: error.message });
  }
};

// user can get products details
const getProducts = async (req, res) => {
  try {
    const allProducts = await productDatas.find();
    res.json(allProducts);
  } catch (error) {
    res.status(404).json({ error: "didnt load" });
    console.log(error);
  }
};

// user can get specific product details
const specificProduct = async (req, res) => {
  try {
    console.log("hii");
    // console.log(req.params.id);
    // const specificProduct = await productDatas.findById(req.params.id);

    // if (specificProduct) {
    //   return res
    //     .status(200)
    //     .json({ message: "Specific Product :", specificProduct });
    // }
    // return res.status(404).json({ error: "product not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

// user can get product by category wise
const getCategoryWise = async (req, res) => {
  const categoryList = req.params.category;
  try {
    let categoryProducts;
    if (categoryList.toLowerCase() === "formal") {
      categoryProducts = await productDatas.find({
        category: { $in: "formal" },
      });
      return res.json(categoryProducts);
    }
    if (categoryList.toLowerCase() === "casual") {
      categoryProducts = await productDatas.find({
        category: { $in: "casual" },
      });
      return res.json(categoryProducts);
    }
    categoryProducts = await productDatas.find({
      category: { $in: categoryList },
    });
    return res.json(categoryProducts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// add product to cart
const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productDatas.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);
    const user = await schema.findOne({ email: decoded.email });

    user.cart.push(productId);
    await user.save();

    res
      .status(200)
      .json({ message: "Product added to cart successfully", product, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};

// get cart product details
const cartProducts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);
    const user = await schema.findOne({ email: decoded.email });

    res.status(200).json({ message: "Your cart products", cart: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error", error: error.message });
  }
};

// remove cart products
const RemoveCartProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);

    const user = await schema.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find the index of the product to remove from the wishlist
    const index = user.cart.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in Cart" });
    }

    // remove the product from the cart and save the updated user document
    user.cart.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error", error: error.message });
  }
};

// product add to wish list
const addToWishList = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productDatas.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);
    const user = await schema.findOne({ email: decoded.email });

    user.wishList.push(productId);
    await user.save();
    res
      .status(200)
      .json({ message: "Product added to wish list successfully", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};

// get wish list products
const wishListProducts = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);
    const user = await schema.findOne({ email: decoded.email }).populate({
      path: "wishList",
      model: "productDatas",
      select: "title description price category",
    });
    res
      .status(200)
      .json({ message: "Your Wish List Products", wishList: user.wishList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error", error: error.message });
  }
};

// product remove from wishlist
const RemoveWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);

    const user = await schema.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find the index of the product to remove from the wishlist
    const index = user.wishList.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    // remove the product from the wishlist and save the updated user document
    user.wishList.splice(index, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error", error: error.message });
  }
};

// add an order
const oderProduct = async (req, res) => {
  try {
    const { cart, total } = req.body;
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);
    const user = await schema.findOne({ email: decoded.email });
    const date = new Date();
    const orderDate = date.slice(0, 10);
    const orderId = Math.floor(Math.random() * (99999999999 - 1111111111 + 1)) + 1111111111;
    const status = "Shipped";

    for(let i=0; i<cart.length; i++) {
      const product = await productDatas.findById(cart[i]);
      if (!product) {
        return res.status(404).json({ message: "product not found", product: product });
      }
    }

    user.orders.push({
      _id: orderId,
      products: cart,
      payment: total,
      orderDate,
      status,
    });
    await user.save();
    console.log(decoded.email, "- order placed successfully");
    
    res
      .status(200)
      .json({ message: "payment successful!...  Order confirmed...", orderId, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error", error: error.message });
  }
};

// get order lists
const getOrderProduct = async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, secretKey);
    const user = await schema.findOne({ email: decoded.email });
    console.log(user.orders);

    res.status(200).json({ orders: user.orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error", error: error.message });
  }
};

module.exports = {
    getAllProducts,
    userLogin,
    userLogout,
    userRegister,
    getProducts,
    specificProduct,
    getCategoryWise,
    addToCart,
    addToWishList,
    cartProducts,
    wishListProducts,
    oderProduct,
    getOrderProduct,
    RemoveWishlist,
    RemoveCartProduct,
};