const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Appointment = require("./models/appointment");
const Register = require("./models/register");
const Diagnosis = require("./models/diagnosis");
const Doctor = require("./models/doctorregistration");
const ADMIN_USERID = "admin";
const ADMIN_PASSWORD = "admin123";



const app=express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
 .connect("mongodb://localhost:27017/healthcareDB")
 .then(() =>{
    console.log("mongoDB connected")
})
 .catch((err) =>{
    console.log("mongoDB connection error",err)
 });
app.get("/",(req,res)=>{
    res.send("backend is running");

});
app.post("/api/appointment", async (req, res) => {
  console.log("DATA RECEIVED:", req.body);

  // Destructure required fields from frontend
  const { patientName, date, specialization, doctor } = req.body;

  // Simple validation
  if (!patientName || !date || !specialization || !doctor) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Create new appointment with additional fields
    const appointment = new Appointment({
      patientName,
      date,
      specialization,
      doctor,
      status: "Pending",      // default status
      diagnosis: "",          // empty initially
      prescription: ""        // empty initially
    });

    await appointment.save();

    res.status(201).json({ message: "Appointment saved successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

app.post("/api/users/register", async (req, res) => {
  console.log("REGISTER DATA RECEIVED:", req.body);
  try {
    const user = new Register(req.body); // create new user
    await user.save(); // save in MongoDB
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});
// ====== Login route ======
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await Register.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

  
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.post("/api/diagnosis", async (req, res) => {
  console.log("DIAGNOSIS DATA RECEIVED:", req.body);

  // Destructure fields from request body
  const { patientName, specialization, doctor, symptoms } = req.body;

  // Simple validation
  if (!patientName || !specialization || !doctor || !symptoms) {
    return res.status(400).json({ error: "All fields are required" });
  }

   try {
    // Create new diagnosis record
    const diagnosis = new Diagnosis({
      patientName,
      specialization,
      doctor,
      symptoms,
      status: "Pending",       // default
      doctorDiagnosis: ""      // empty initially
    });

    await diagnosis.save();

    res.status(201).json({ message: "Diagnosis request submitted", diagnosis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save diagnosis" });
  }
});

// ====== Doctor Registration ======
app.post("/api/doctor/register", async (req, res) => {
  console.log("DOCTOR REGISTER DATA RECEIVED:", req.body);

  const { name, email, password, specialization } = req.body;

  if (!name || !email || !password || !specialization) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const doctor = new Doctor({
      name,
      email,
      password,
      specialization,
      status: "Pending"
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor registered successfully. Waiting for admin approval"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Doctor registration failed" });
  }
});
// ===== ADMIN LOGIN =====
app.post("/api/admin/login", (req, res) => {
  const { userid, password } = req.body;

  if (userid === ADMIN_USERID && password === ADMIN_PASSWORD) {
    res.status(200).json({ message: "Admin login successful" });
  } else {
    res.status(401).json({ error: "Invalid admin credentials" });
  }
});
// ===== GET ALL DOCTORS (ADMIN) =====
app.get("/api/admin/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});
// ===== ACCEPT DOCTOR =====
app.put("/api/admin/doctor/accept/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, {
      status: "Approved"
    });
    res.status(200).json({ message: "Doctor accepted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to accept doctor" });
  }
});
// ===== REJECT DOCTOR =====
app.put("/api/admin/doctor/reject/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, {
      status: "Rejected"
    });
    res.status(200).json({ message: "Doctor rejected" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to reject doctor" });
  }
});




app.listen(PORT,()=>{
    console.log("server running on port" + PORT);
});