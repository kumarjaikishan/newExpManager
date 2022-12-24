import React from 'react'
import { useNavigate } from "react-router-dom";

const Logout = ({setlogin}) => {
    let navigate = useNavigate();
    localStorage.clear("name");
    localStorage.clear("email");
    setlogin(false);
    navigate('/');
    return;
  return (
    <div>Logout</div>
  )
}

export default Logout