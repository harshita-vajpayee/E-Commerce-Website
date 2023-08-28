const mongoose = require('mongoose')
let Schema = mongoose.Schema;

let bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        trim: true,
    }

})

const User = mongoose.model("User", userSchema)

module.exports = User