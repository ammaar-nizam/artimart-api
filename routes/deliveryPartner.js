const DeliveryPartner = require("../models/DeliveryPartner");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Get Delivery Partner By Id
router.get("/find/:id", async (req, res) => {
    try {
      const deliveryPartner = await DeliveryPartner.findById(req.params.id);
      res.status(200).json(deliveryPartner);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Get all Delivery Partners
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    try {
      let deliveryPartners;
  
      if (qNew) {
        deliveryPartners = await DeliveryPartner.find().sort({ createdAt: -1 }).limit(1); 
      } else {
        deliveryPartners = await DeliveryPartner.find();
      }
  
      res.status(200).json(deliveryPartners);
    } catch (error) {
      res.status(500).json(error);
    }
});

// Add Delivery Partner
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  
  const newDeliveryPartner = new DeliveryPartner(req.body);

  try {
    const savedDeliveryPartner = await newDeliveryPartner.save();
    res.status(200).json(savedDeliveryPartner);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Delivery Partner By Id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedDeliveryPartner = await DeliveryPartner.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDeliveryPartner);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Delivery Partner By Id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await DeliveryPartner.findByIdAndDelete(req.params.id);
    res.status(200).json("Delivery Partner has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;