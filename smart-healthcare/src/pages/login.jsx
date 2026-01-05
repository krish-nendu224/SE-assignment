import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Login successful!");
        localStorage.setItem("user", "true"); // IMPORTANT FOR NAVBAR
        navigate("/");  // redirect to Home
      } else {
        alert(data.error); // show backend error
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
   



  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;