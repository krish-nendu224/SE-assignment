import { useState } from "react";

function Appointment() {
  // 1️⃣ Doctor data (static for now)
  const doctorData = {
    "General Physician": ["Dr. Anil", "Dr. Meera"],
    "Cardiologist": ["Dr. Rahul", "Dr. Sneha"],
    "Dermatologist": ["Dr. Neha", "Dr. Arun"],
  };

  // 2️⃣ State variables
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState("");

  // 3️⃣ Handle booking
  const handleBooking = async () => {
    if (!patientName || !date || !specialization || !doctor) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          date,
          specialization,
          doctor,
        }),
      });

      alert("Appointment sent");

      // clear form after booking
      setPatientName("");
      setDate("");
      setSpecialization("");
      setDoctor("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Appointment</h2>

      {/* Patient Name */}
      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <br /><br />

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br />

      {/* Select Specialization */}
      <select
        value={specialization}
        onChange={(e) => {
          setSpecialization(e.target.value);
          setDoctor(""); // reset doctor when specialization changes
        }}
      >
        <option value="">-- Select Specialization --</option>
        {Object.keys(doctorData).map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>
      <br /><br />

      {/* Select Doctor */}
      <select
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        disabled={!specialization}
      >
        <option value="">-- Select Doctor --</option>
        {specialization &&
          doctorData[specialization].map((doc, index) => (
            <option key={index} value={doc}>
              {doc}
            </option>
          ))}
      </select>
      <br /><br />

      <button onClick={handleBooking}>Book Appointment</button>
    </div>
  );
}

export default Appointment;
