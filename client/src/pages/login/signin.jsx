import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Signin = ({setlogin, setleddetail, setexpenselist,notification }) => {
    let navigate = useNavigate();
    const init = {
        email: "",
        password: ""
    }
  
    const [signinp, setsigninp] = useState(init);
    const [loginpass, setloginpass] = useState(true);
   
    const signhandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setsigninp({
            ...signinp, [name]: value
        })
    }

    const submit = async () => {
        const { email, password } = signinp;

        if (!email || !password) {
            notification.warn("All fields are Required",1300);
            return;
        }
        try {
            const res = await fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const datae = await res.json();
            console.log(datae);
            // console.log(datae.data[0].ledger);
            const username = datae.data[0].name;
            document.title = "AccuSoft - " + datae.data[0].name;
            const mail = datae.data[0].email;
            const id = datae.data[0]._id;
            if (datae.msg=="Login Successfully") {
                notification.success(datae.msg, 1300);
            }
            if (datae.msg=="NO USER FOUND") {
                notification.warn(datae.msg, 1200);
            }
            setlogin(true);
            setleddetail(datae.data[0].ledger);
            setexpenselist(datae.explist);
            localStorage.setItem("name", username);
            localStorage.setItem("email", mail);
            localStorage.setItem("id", id);
            navigate('/');
        } catch (error) {
            notification.warn(error,2000);
        }
       

    }
    return (
        <>
            
            <div className="logine">
                <TextField
                    label="Email*"
                    size="small"
                    className='filled'
                    onChange={signhandle}
                    name="email"
                    value={signinp.email}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>,

                    }}
                />
                <TextField
                    label="Password*"
                    className='filled'
                    size="small"
                    type={loginpass ? "password" : null}
                    onChange={signhandle}
                    name="password"
                    value={signinp.password}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <VpnKeyIcon />
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end" style={{cursor:"pointer"}} onClick={()=> loginpass ? setloginpass(false):setloginpass(true)}>
                           {loginpass ? <RemoveRedEyeIcon  /> : <VisibilityOffIcon  />} 
                        </InputAdornment>
                    }}

                />
                <button onClick={() => submit()}>Login</button>
            </div>
        </>
    )
}

export default Signin;