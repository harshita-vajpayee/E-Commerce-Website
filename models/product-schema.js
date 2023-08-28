var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
    //mongoose.connect("")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product Price"]
    },
    image: {
        type: String,
        required: true
    }
}, { timestamp: true })

module.exports = mongoose.model("Product", productSchema)