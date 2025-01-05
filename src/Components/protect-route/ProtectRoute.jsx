import React, { useEffect, useState } from 'react'
import ErrorPage from '../Error/ErrorPage';

const ProtectRoute = ({children}) => {
  const [token, setToken] = useState("")
  useEffect(()=>{
    const token = localStorage.getItem("token");
    setToken(token)
    console.log(token);
    
  },[])
  if(token){
    return<>{children}</>
    }else{
      return <ErrorPage/>
    }
}

export default ProtectRoute