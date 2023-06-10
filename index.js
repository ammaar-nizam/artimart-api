const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const customerRoute = require("./routes/customer");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const deliveryPartnerRoute = require("./routes/deliveryPartner");
const favoriteRoute = require("./routes/favorite");
const feedbackRoute = require("./routes/feedback");
const paymentRoute = require("./routes/payment");
const shippingRoute = require("./routes/shipping");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/customers", customerRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/deliveryPartners", deliveryPartnerRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/feedbacks", feedbackRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/shippings", shippingRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use('/uploads', express.static('uploads'));
app.use('/uploads/featured-images', express.static('uploads/featured-images'));

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});