import React from 'react'
import './login.css';
import { useState } from 'react';
import GrassIcon from '@mui/icons-material/Grass';
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Signin from './signin';
import Signup from './signup';
import { useNavigate } from "react-router-dom";

const Login = ({setlogin,setleddetail,setloader,setexpenselist}) => {
    const [log, setlog] = useState(true);
    const fun = (val) => {
        setlog(val);
        setloader(false)
    }
 
    return (
        <>
          
            <div className="login">
                <div className="box">
                    <div className="logo">
                        <GrassIcon className='company' />
                    </div>
                    <div className="want">
                        <span className={log ? "active" : null} onClick={() => fun(true)}>Login</span>
                        <span className={log ? null : "active"} onClick={() => fun(false)}>Register</span>
                    </div>
                    <div className="both" style={{ transform: log ? "translateX(0%)" : "translateX(-50%)" }}>
                        <Signin setexpenselist={setexpenselist} setleddetail={setleddetail} setlogin={setlogin}/>
                        <Signup setlog={setlog}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login