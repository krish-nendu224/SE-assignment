import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message); // shows "User registered successfully"
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <h2>Register Here</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
