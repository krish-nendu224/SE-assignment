const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    email:String,
    password:String
});
module.exports = mongoose.model("Register",registerSchema);