const mongoose = require("mongoose");

const DeliveryPartnerSchema = new mongoose.Schema(
    {
        deliveryPartnerName: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        phone: {type:Number, required:true},
        vehicleType: {type:String, required:true},
        licencePlateNumber: {type:String, required:true, unique:true},
        available: {type:Boolean, default: true},
        averageRating: {type:Number},
        deliveryHistory: {type:Array}
    },
    {timestamps: true}
);

module.exports = mongoose.model("DeliveryPartner", DeliveryPartnerSchema);