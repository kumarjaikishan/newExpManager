import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = ({setlogin,setleddetail}) => {
  let navigate = useNavigate();
    useEffect(() => {
      localStorage.clear("name");
      localStorage.clear("email");
      setlogin(false);
      document.title="AccuSoft";
      setleddetail([]);
      navigate('/login');
      return;
    }, [])
}

export default Logout