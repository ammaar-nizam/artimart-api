const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER A USER
router.post("/register", async (req, res) => {
    const newUser = new User({
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(),
      userRole: req.body.userRole,
      isAdmin: req.body.isAdmin,
      age: req.body.age,
      phone: req.body.phone,
      gender: req.body.gender,
      house: req.body.house,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      zipCode: req.body.zipCode
      
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// LOGGING IN AS A USER
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("Wrong credentials!");
  
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET_KEY
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
      OriginalPassword !== req.body.password &&
        res.status(401).json("Wrong credentials!");
  
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:"3d"}
      );
  
      const { password, ...others } = user._doc;
  
      res.status(200).json({...others, accessToken});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;