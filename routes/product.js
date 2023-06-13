const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const multer = require("multer");


// const storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, './uploads/');
//   },
//   filename: function(req, file, callback) {
//     callback(null, file.originalname);
//   }
// });

// const fileFilter = (req, file, callback) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

const router = require("express").Router();

// Get Product By Id
router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
// Get all Products
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
});



// Create a Product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  
  const newProduct = new Product({

    productName: req.body.productName,
    description: req.body.description,
    productImage: req.file.path,
    categoryName: req.body.categoryName,
    price: req.body.price,
    availableQuantity: req.body.availableQuantity,
    available: req.body.available,
    dimension: req.body.dimension

  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Product By Id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Product By Id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;