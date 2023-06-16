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
const commonRoute = require("./routes/commonRoute");
const cors = require("cors");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const path = require('path')
const src = path.join(__dirname, "images");

const util = require('util')
const { format } = util

app.use(express.static(src));

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((error) => {
    console.log(error);
  });

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
});

const storage = new Storage({
  keyFilename: "artimart-image-storage-5ab3b6b7b224.json",
  projectId: 'artimart-image-storage',
})

const bucket = storage.bucket("artimart-images-bucket");

app.post("/uploads", multer.single("file"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.post('/uploads', async (req, res, next) => {
//   try {
//     const myFile = req.file
//     const imageUrl = await uploadImage(myFile)
//     res
//     .status(200)
//     .json({
//       message: "Upload was successful",
//       data: imageUrl
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({
//     error: err,
//     message: 'Internal server error!',
//   })
//   next();
// })

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
app.use("/api", commonRoute);
// app.use('/uploads', express.static('uploads'));
// app.use('/uploads/featured-images', express.static('uploads/featured-images'));

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});