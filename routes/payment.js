const Payment = require("../models/Payment");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Get Payment By Id
router.get("/find/:id", async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Get all Payments
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    try {
      let payments;
  
      if (qNew) {
        payments = await Payment.find().sort({ createdAt: -1 }).limit(1);
      } else {
        payments = await Payment.find();
      }
  
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json(error);
    }
});

// Create a Payment
router.post("/", verifyToken, async (req, res) => {
  
  const newPayment = new Payment(req.body);

  try {
    const savedPayment = await newPayment.save();
    res.status(200).json(savedPayment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Payment By Id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Payment By Id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json("Payment has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;