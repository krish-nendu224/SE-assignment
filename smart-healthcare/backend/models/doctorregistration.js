const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  specialization: String,

  status: {
    type: String,
    default: "Pending"   
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);
