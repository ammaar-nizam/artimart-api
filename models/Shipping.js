const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
    {
        orderId: {type:String, required:true},
        deliveryPartnerId: {type:String, required:true},
        shippingDate: {type:Date, required: true},
        estimatedDeliveryDate: {type:Date, required: true},
        actualDeliveryDate: {type:Date, required: true},
        shippingMethod: {type:String, required:true},
        shippingAddress: {type:Object, required:true},
        shippingStatus: {type:String, default:"Pending"},
        trackingNumber: {type:String, required:true, unique:true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Shipping", ShippingSchema);