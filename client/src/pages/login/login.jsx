import React from 'react'
import './login.css';
import { useState } from 'react';
import GrassIcon from '@mui/icons-material/Grass';
import Signin from './signin';
import Signup from './signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setlogin,setleddetail,setloader,setexpenselist}) => {
    const [log, setlog] = useState(true);
    const fun = (val) => {
        setlog(val);
        setloader(false)
    }
    const notify = (msg, dur) => {
        toast.success(msg, {
            autoClose: dur,
        });
    }
    const warn = (msg, dur) => {
        toast.warning(msg, {
          autoClose: dur,
        });
      }
 
    return (
        <>
          <ToastContainer />
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
                        <Signin notify={notify} warn={warn} setexpenselist={setexpenselist} setleddetail={setleddetail} setlogin={setlogin}/>
                        <Signup notify={notify} warn={warn} setlog={setlog}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login