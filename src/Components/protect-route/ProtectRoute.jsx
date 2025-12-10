import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  if (token) {
    return <>{children}</>;
  } else {
    navigate("/Sign-In");
  }
};

export default ProtectRoute;
