function Appointment(){
    const handleBooking = async() =>{
        
        await fetch("http://localhost:5000/api/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        patientName: "Rahul",
        doctor: "Cardiologist",
        date: "2025-01-10"
      })
    });

    alert("Appointment sent to backend");
  };
    return(
        <div>
            <h2>Book Appointments</h2>
            <input type="text" placeholder="patient name"/><br/><br/>
            <input type="date"/><br/><br/>
            <select>
                <option>General physician</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
            </select><br/><br/>
            <button onClick={handleBooking}>Book Appointment</button>

        </div>
    );

}
export default Appointment