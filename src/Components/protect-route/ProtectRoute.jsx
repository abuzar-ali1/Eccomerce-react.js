import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check ticket
  
  if (!token) {
    return <Navigate to="/Sign-In" />; // No ticket → Go to SignIn
  }
  
  return children; // Has ticket → Let them in
};


export default ProtectRoute;