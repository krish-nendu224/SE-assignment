import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userid || !password) {
      alert("Please enter admin credentials");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid, password })
      });

      if (response.ok) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin-dashboard");
      } else {
        alert("Invalid admin credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Admin User ID"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
