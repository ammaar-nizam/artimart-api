const Category = require("../models/Category");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads/featured-images/');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const router = require("express").Router();

// Get Category By Id
router.get("/find/:id", async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Get all Categories
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    try {
      let categories;
  
      if (qNew) {
        categories = await Category.find().sort({ createdAt: -1 }).limit(1);
      } else {
        categories = await Category.find();
      }
  
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
});

// Create a Category
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  
  const newCategory = new Category({

    categoryName: req.body.categoryName,
    description: req.body.description,
    featuredImage: req.file.path,
    productsCount: req.body.productsCount

  });

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Category By Id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Category By Id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;