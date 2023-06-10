const Shipping = require("../models/Shipping");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Get Shipping By Id
router.get("/find/:id", async (req, res) => {
    try {
      const shipping = await Shipping.findById(req.params.id);
      res.status(200).json(shipping);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Get all Shippings
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    try {
      let shippings;
  
      if (qNew) {
        shippings = await Shipping.find().sort({ createdAt: -1 }).limit(1);
      } else {
        shippings = await Shipping.find();
      }
  
      res.status(200).json(shippings);
    } catch (error) {
      res.status(500).json(error);
    }
});

// Create a Shipping
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  
  const newShipping = new Shipping(req.body);

  try {
    const savedShipping = await newShipping.save();
    res.status(200).json(savedShipping);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Shipping By Id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedShipping = await Shipping.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedShipping);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Shipping By Id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Shipping.findByIdAndDelete(req.params.id);
    res.status(200).json("Shipping has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;