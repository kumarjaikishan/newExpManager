import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Signup = ({ setlog,notification }) => {
    const init = {
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        ledger: ["general","other"]
    }
    const [btnclick,setbtnclick]= useState(false);
    const [signinp, setsigninp] = useState(init);
    const [signuppass, setsignuppass] = useState(true);
    const signhandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setsigninp({
            ...signinp, [name]: value
        })
    }

    const submit = async (event) => {
      setbtnclick(true);
        const today = new Date;
        const imgsrc = "";
        const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getUTCDate();
        const { name, email, phone, password,cpassword, ledger } = signinp;
        if (!name || !email || !phone || !password || !ledger) {
            notification. warn("All Fields are Required",1800)
            return;
        }
        if (password != cpassword ) {
            notification.warn("Password does not match",1200)
            return;
        }
        const res = await fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, password, date, ledger,imgsrc
            })
        })
        const datae = await res.json();
        console.log(datae);
        if (datae.data) {
            setsigninp(init);
            notification.success("Signup Successful", 1400)
            setbtnclick(false);
            setlog(true);
        }
    }

    return (
        <>
            <div className="singup">
                <TextField
                    label="Name*"
                    size="small"
                    className='filled'
                    onChange={signhandle}
                    name="name"
                    value={signinp.name}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>,
                    }}
                />
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
                    label="Phone*"
                    size="small"
                    color={signinp.phone.length == 10 ? "primary" : "warning"}
                    className='filled'
                    onChange={signhandle}
                    name="phone"
                    onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                    value={signinp.phone}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <LocalPhoneIcon />
                        </InputAdornment>,
                    }}
                />
                <TextField
                    label="Password*"
                    className='filled'
                    size="small"
                    onChange={signhandle}
                    name="password"
                    type={signuppass?"password":null}
                    value={signinp.password}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <VpnKeyIcon />
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end" style={{cursor:"pointer"}} onClick={()=> signuppass ? setsignuppass(false):setsignuppass(true)}>
                           {signuppass ?<RemoveRedEyeIcon  /> : <VisibilityOffIcon  /> } 
                        </InputAdornment>
                    }}
                />
                <TextField
                    label="Confirm Password*"
                    className='filled'
                    color={signinp.password == signinp.cpassword ? "primary" : "warning"}
                    size="small"
                    onChange={signhandle}
                    name="cpassword"
                    value={signinp.cpassword}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <VpnKeyIcon />
                        </InputAdornment>,
                    }}
                />
                <button disabled={btnclick} style={btnclick ?{background: "#cccccc", color: "#666666"}:{background: "#0984e3", color: "white"}}  onClick={() => submit()}>Signup</button>
            </div>
        </>
    )
}

export default Signup