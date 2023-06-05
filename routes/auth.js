const router = require("express").Router();
const Customer = require("../models/Customer");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Registering the customer
router.post("/register", async (req, res) => {
    const newCustomer = new Customer({
        customerName: req.body.customerName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString()
    });

    try{
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    }catch(error){
        res.status(500).json(error);
    }

});

// Logging in as a Customer
router.post("/login", async (req, res) => {
    try{
        const customer = await Customer.findOne({customerName: req.body.customerName});
        !customer && res.status(401).json("Incorrect username or password");

        const hashPassword = CryptoJS.AES.decrypt(customer.password, process.env.PASSWORD_SECRET_KEY);
        const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Incorrect username or password");

        const accessToken = jwt.sign(
            {
                id: customer._id,
                isAdmin: customer.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn: "3d"}
        );

        const {password, ...others} = customer._doc;

        res.status(200).json({...others, accessToken});

    }catch(error){
        res.status(500).json(error)
    }
});

module.exports = router;