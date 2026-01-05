import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // protect admin route
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn");
    if (!isAdmin) {
      navigate("/admin-login");
    } else {
      fetchDoctors();
    }
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptDoctor = async (id) => {
    await fetch(`http://localhost:5000/api/admin/doctor/accept/${id}`, {
      method: "PUT"
    });
    fetchDoctors();
  };

  const rejectDoctor = async (id) => {
    await fetch(`http://localhost:5000/api/admin/doctor/reject/${id}`, {
      method: "PUT"
    });
    fetchDoctors();
  };

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <hr />

      {doctors.length === 0 ? (
        <p>No doctors registered</p>
      ) : (
        doctors.map((doc) => (
          <div key={doc._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p><b>Name:</b> {doc.name}</p>
            <p><b>Email:</b> {doc.email}</p>
            <p><b>Specialization:</b> {doc.specialization}</p>
            <p><b>Status:</b> {doc.status}</p>

            {doc.status === "Pending" && (
              <>
                <button onClick={() => acceptDoctor(doc._id)}>Accept</button>
                <button onClick={() => rejectDoctor(doc._id)}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
