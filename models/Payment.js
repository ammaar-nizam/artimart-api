const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        orderId: {type:String, required:true},
        paymentDate: {type:Date, required: true},
        amount: {type:Number, required:true},
        paymentMethod: {type:String, required:true},
        cardholderName: {type:String, required:true},
        cardNumber: {type:Number, required:true},
        expirationNumber: {type:Number, required:true},
        billingAddress: {type:Object, required:true},
        paymentConfirmationNumber: {type:String, required:true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Payment", PaymentSchema);