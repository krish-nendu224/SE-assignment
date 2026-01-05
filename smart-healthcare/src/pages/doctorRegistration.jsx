import { useState } from "react";

function DoctorRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");

  const registerDoctor = async () => {
    if (!name || !email || !password || !specialization) {
      alert("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/doctor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        specialization
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setSpecialization("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h2>Doctor Registration</h2>

      <input
        type="text"
        placeholder="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br/><br/>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      /><br/><br/>

      <button type="button" onClick={registerDoctor}>
        Register
      </button>
    </div>
  );
}

export default DoctorRegister;
