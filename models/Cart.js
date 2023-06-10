const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        customerId: {type:String, required:true},
        products: [
            {
                productId: {type:String},
                quantity: {type:Number, default:1}
            }
        ],
        totalPrice: {type:Number}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);