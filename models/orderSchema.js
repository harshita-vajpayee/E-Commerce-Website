const mongoose = require("mongoose");
const User = require("./userSchema")
const Product = require("./product-schema")


const orderSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
        default: "India"
    },
    pinCode: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    paymentInfo: {
        type: String,
        default: "Paid",
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        default: "Processing",
    }
});

module.exports = mongoose.model("Order", orderSchema);