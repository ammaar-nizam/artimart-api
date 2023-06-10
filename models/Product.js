const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        productName: {type:String, required:true, unique:true},
        description: {type:String, required:true},
        productImage: {type:String, required:true},
        categoryName: {type:String, required:true},
        price: {type:Number, required:true},
        availableQuantity: {type:Number, required:true},
        available: {type:String, default:"Not Available"},
        dimension: {type:String, required:true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);