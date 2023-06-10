const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        categoryName: {type:String, required:true, unique:true},
        description: {type:String, required:true},
        featuredImage: {type:String, required:false},
        productsCount: {type:Number, required:true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Category", CategorySchema);