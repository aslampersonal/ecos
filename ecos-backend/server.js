const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

//const route = express.Router();

mongoose
  .connect("mongodb+srv://ecos:NBnXAf3aCZzPaD2x@cluster0.7ctkgki.mongodb.net/ucos?retryWrites=true&w=majority")
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use(cookieParser());

// for admin routes
const adminRoute = require("./routes/adminRoutes");
app.use("/api/admin", adminRoute);

//for user route

const userRoute = require("./routes/userRoutes");
app.use("/api/users", userRoute);

app.listen(3000, () => {
  console.log("server connectec at 3000");
});