const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        customerId: {type:String, required:true},
        productId: {type:String, required:true},
        rating: {type:Number, required:true},
        review: {type:String, required:false},
        feedbackStatus: {type:String, required:true, default:"Pending"},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Feedback", FeedbackSchema);