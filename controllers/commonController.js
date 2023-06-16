const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order");

const dataCount = async(req, res) => {
    try{
        const countData = [];
        const productData = await Product.find().count();
        const customerData = await Customer.find().count();
        const orderData = await Order.find().count();

        countData.push({
            products: productData,
            customers: customerData,
            orders: orderData 
        });

        res.status(200).send({success:true, message: "Data Count", data: countData})
    }catch(error){
        res.status(400).send({success:false, message: error.message})
    }
}

module.exports = {dataCount}