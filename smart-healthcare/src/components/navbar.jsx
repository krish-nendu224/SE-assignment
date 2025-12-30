import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav style={{padding:"10px",background:"#f0f0f0"}}>
            <Link to="/" style={{marginRight:"10px"}}>Home</Link>
            <Link to="/login" style={{marginRight:"10px"}}>Login</Link>
            <Link to="/doctor" style={{marginRight:"10px"}}>Doctor</Link>
            <Link to="/appointment" style={{marginRight:"10px"}}>Appointment</Link>
            <Link to="/diagnosis">Diagnosis</Link>
        </nav>
    );

}
export default Navbar