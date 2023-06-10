const Feedback = require("../models/Feedback");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// Get Feedback By Id
router.get("/find/:id", async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Get all Feedbacks
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    try {
      let feedbacks;
  
      if (qNew) {
        feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(1);
      } else {
        feedbacks = await Feedback.find();
      }
  
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json(error);
    }
});

// Create a Feedback
router.post("/", verifyToken, async (req, res) => {
  
  const newFeedback = new Feedback(req.body);

  try {
    const savedFeedback = await newFeedback.save();
    res.status(200).json(savedFeedback);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Feedback By Id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Feedback By Id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json("Feedback has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;