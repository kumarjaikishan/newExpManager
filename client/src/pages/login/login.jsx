import React from 'react'
import './login.css';
import { useState } from 'react';
import GrassIcon from '@mui/icons-material/Grass';
import Signin from './signin';
import Signup from './signup';

const Login = ({setlogin,setleddetail,setloader,setexpenselist,notification}) => {
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
                        <Signin notification={notification}  setexpenselist={setexpenselist} setleddetail={setleddetail} setlogin={setlogin}/>
                        <Signup notification={notification} setlog={setlog}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login