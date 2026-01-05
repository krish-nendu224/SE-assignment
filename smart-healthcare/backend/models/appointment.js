const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"   // Pending / Completed
  },
  diagnosis: {
    type: String,
    default: ""
  },
  prescription: {
    type: String,
    default: ""
  },
  tokenNumber: {
    type: String,
    default: ""
  },
  timeSlot: {
    type: String,
    default: ""
  }
  
});

module.exports = mongoose.model("Appointment", appointmentSchema);
