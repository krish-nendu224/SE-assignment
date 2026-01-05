import { BrowserRouter,Routes,Route} from "react-router-dom";


import Home from "./pages/home";
import Login from "./pages/login";
import Doctor from "./pages/doctor";
import Appointment from "./pages/appointment";
import Diagnosis from "./pages/diagnosis";
import Register from "./pages/register";
import DoctorRegister from "./pages/doctorRegistration";
import AdminLogin from "./pages/adminlogin";
import AdminDashboard from "./pages/admindashboard";


import Navbar from "./components/navbar";


function App() {
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/doctor" element={<Doctor/>}/>
      <Route path="/appointment" element={<Appointment/>}/>
      <Route path="/diagnosis" element={<Diagnosis/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/doctorRegistration" element={<DoctorRegister/>}/>
      <Route path="/admin-login" element={<AdminLogin/>}/>
      <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      
      
    </Routes>
    </BrowserRouter>
  );
 
}

export default App
