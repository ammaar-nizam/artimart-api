const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userFirstName: { type: String, required: true, unique: true },
    userLastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    age: { type: Number, required: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    house: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
