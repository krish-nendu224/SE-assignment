function Doctor() {
  const doctors = {
    "General Physician": ["Dr. Anil", "Dr. Meera", "Dr. Kiran"],
    "Cardiologist": ["Dr. Rahul", "Dr. Sneha"],
    "Dermatologist": ["Dr. Neha", "Dr. Arun"],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Doctors</h2>

      {Object.entries(doctors).map(([specialization, doctorList]) => (
        <div key={specialization} style={{ marginBottom: "15px" }}>
          <h3>{specialization}</h3>
          <ul>
            {doctorList.map((doctor, index) => (
              <li key={index}>{doctor}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Doctor;
