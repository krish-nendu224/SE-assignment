const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  patientName: {
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
  symptoms: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending" // Pending / Completed
  },
  doctorDiagnosis: {   // THIS NAME WILL MATCH IN BACKEND
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
