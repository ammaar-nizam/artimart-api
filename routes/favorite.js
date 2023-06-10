const Favorite = require("../models/Favorite");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Get Favorite By Id
router.get("/find/:id", async (req, res) => {
    try {
      const favorite = await Favorite.findById(req.params.id);
      res.status(200).json(favorite);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Get all Favorites
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    try {
      let favorites;
  
      if (qNew) {
        favorites = await Favorite.find().sort({ createdAt: -1 }).limit(1);
      } else {
        favorites = await Favorite.find();
      }
  
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json(error);
    }
});

// Create a Favorite
router.post("/", verifyToken, async (req, res) => {
  
  const newFavorite = new Favorite(req.body);

  try {
    const savedFavorite = await newFavorite.save();
    res.status(200).json(savedFavorite);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Favorite By Id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedFavorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Favorite By Id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json("Favorite has been removed");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;