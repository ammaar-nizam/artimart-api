const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
    {
        customerName: {type:String, required:true, unique:true},
        email: {type:String, required:true, unique:true},
        password: {type:String, required:true, unique:true},
        isAdmin:{
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Customer", CustomerSchema);