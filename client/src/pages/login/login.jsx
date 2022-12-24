import React from 'react'
import './login.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import GrassIcon from '@mui/icons-material/Grass';
const Login = () => {
    const [log,setlog] = useState(true);
    const fun =(val)=>{
        setlog(val);
    }
    return (
        <>
            <div className="login">
                <div className="box">
                    <div className="logo">
                    <GrassIcon className='company'/>
                    </div>
                    <div className="want">
                     <span className={log? "active":null} onClick={()=> fun(true)}>Login</span>
                     <span className={log? null:"active"} onClick={()=> fun(false)}>Register</span>
                    </div>
                    <div className="both" style={{transform: log ? "translateX(0%)":"translateX(-50%)"}}>
                        <div className="logine">
                            <TextField
                                label="Email*"
                                size="small"
                                className='filled'
                                // onChange={handleChange}
                                name="amt"
                                // value={input.amt}
                                InputProps={{
                                    startAdornment:  <InputAdornment position="start">
                                          <EmailIcon />
                                          </InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Password*"
                                className='filled'
                                size="small"
                                // onChange={handleChange}
                                name="amt"
                                // value={input.amt}
                            InputProps={{
                                startAdornment:  <InputAdornment position="start">
                                      <VpnKeyIcon />
                                      </InputAdornment>,
                            }}
                            />
                            <button>Login</button>
                        </div>
                        <div className="singup">
                            <TextField
                                label="Name*"
                                size="small"
                                className='filled'
                                // onChange={handleChange}
                                name="amt"
                                // value={input.amt}
                                InputProps={{
                                    startAdornment:  <InputAdornment position="start">
                                          <AccountCircle />
                                          </InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Email*"
                                size="small"
                                className='filled'
                                // onChange={handleChange}
                                name="amt"
                                // value={input.amt}
                                InputProps={{
                                    startAdornment:  <InputAdornment position="start">
                                          <EmailIcon />
                                          </InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Phone*"
                                size="small"
                                className='filled'
                                // onChange={handleChange}
                                name="amt"
                                 onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                // value={input.amt}
                                InputProps={{
                                    startAdornment:  <InputAdornment position="start">
                                          <LocalPhoneIcon />
                                          </InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Password*"
                                className='filled'
                                size="small"
                                // onChange={handleChange}
                                name="amt"
                                // value={input.amt}
                                InputProps={{
                                    startAdornment:  <InputAdornment position="start">
                                          <VpnKeyIcon />
                                          </InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Confirm Password*"
                                className='filled'
                                size="small"
                                // onChange={handleChange}
                                name="amt"
                                // value={input.amt}
                                InputProps={{
                                    startAdornment:  <InputAdornment position="start">
                                          <VpnKeyIcon />
                                          </InputAdornment>,
                                }}
                            />
                            <button>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login