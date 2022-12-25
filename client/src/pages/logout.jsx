import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = ({setlogin,setleddetail}) => {
    
  let navigate = useNavigate();
    useEffect(() => {
      localStorage.clear("name");
      localStorage.clear("email");
      setlogin(false);
      setleddetail([]);
      navigate('/login');
      return;
    }, [])
    
  return (
    <div>Logout</div>
  )
}

export default Logout