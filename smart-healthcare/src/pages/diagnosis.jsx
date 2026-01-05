import { useState } from "react";

function Diagnosis() {
  // Doctor list by specialization
  const doctorData = {
    "General Physician": ["Dr. Anil", "Dr. Meera"],
    "Cardiologist": ["Dr. Rahul", "Dr. Sneha"],
    "Dermatologist": ["Dr. Neha", "Dr. Arun"],
  };

  // State variables
  const [patientName,setPatientName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState("");
  const [symptoms, setSymptoms] = useState("");

  // Submit function
  const handleButton = async () => {
    if (!patientName||!specialization || !doctor || !symptoms) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,  
          specialization,
          doctor,
          symptoms,
          status: "Pending", // default status
        }),
      });

      alert("Diagnosis request submitted");

      // Clear form
      setPatientName("");
      setSpecialization("");
      setDoctor("");
      setSymptoms("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Basic Diagnosis</h1>
      <label>Patient name</label><br/>
      <input type="text" placeholder="enter name" value={patientName} onChange={(e) => setPatientName(e.target.value)}/><br/><br/>

      {/* Step 1: Select Specialization */}
      <label>Specialization:</label><br/>
      <select
        value={specialization}
        onChange={(e) => {
          setSpecialization(e.target.value);
          setDoctor(""); // reset doctor when specialization changes
        }}
      >
        <option value="">-- Select Specialization --</option>
        {Object.keys(doctorData).map((spec) => (
          <option key={spec} value={spec}>{spec}</option>
        ))}
      </select>
      <br /><br/>

      {/* Step 2: Select Doctor */}
      <label>Doctor:</label><br/>
      <select
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        disabled={!specialization}
      >
        <option value="">-- Select Doctor --</option>
        {specialization &&
          doctorData[specialization].map((doc, index) => (
            <option key={index} value={doc}>{doc}</option>
          ))
        }
      </select>
      <br /><br/>

      {/* Step 3: Symptoms Textarea */}
      <label>Symptoms:</label><br/>
      <textarea
        placeholder="Enter your symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        rows={5}
        cols={40}
      />
      <br /><br/>

      {/* Step 4: Submit Button */}
      <button onClick={handleButton}>Check</button>
    </div>
  );
}

export default Diagnosis;
