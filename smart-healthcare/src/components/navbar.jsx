import { Link ,useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";

function Navbar() {
    const[isLoggedIn,setIsLoggedIn]=useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){
            setIsLoggedIn(user=="true");
        }

    },[]);

    const logout=()=>{
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login")
    };

  return (
    <nav style={{padding:"10px",backgroundColor:"#f0f0f0",display:"flex",gap:"15px"}}>
      
        <Link to="/">Home</Link>
        {!isLoggedIn ?(
            <>
            <Link to="/login">Login </Link>
            <Link to="/register"> UserRegistration</Link>
            <Link to="/doctorRegistration">DoctorRegistration</Link>
            <Link to="/admin-login">AdminLogin</Link>
            </>
        ):(
            <>
            <Link to="/doctor">Doctor</Link>
            <Link to="/appointment">Appointment</Link>
            <Link to="/diagnosis">Diagnosis</Link>
            <button onClick={logout}>Logout</button>
            </>
        )}
        

        
      
    </nav>
  );
}

export default Navbar;
