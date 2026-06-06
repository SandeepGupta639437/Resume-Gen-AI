const mongoose = require("mongoose")

const userSchemas = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username already taken'],
        required: true
    },
    email: {
        type: String,
        unique: [true, 'email already taken'],    
    },
    password: {
        type: String,
        required: true  
    }
})

const userModel = mongoose.model("user", userSchemas)
module.exports = userModel