import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Signin = ({setlogin,setleddetail}) => {
    let navigate = useNavigate();
    const init ={
        email: "",
        password: ""
    }
    const [signinp, setsigninp] = useState(init);
    const signhandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setsigninp({
            ...signinp, [name]: value
        })
    }
    const submit = async () => {
        const { email, password } = signinp;

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
        console.log(datae.data[0].name);
        const username = datae.data[0].name;
        const mail = datae.data[0].email;
        const id = datae.data[0]._id;
        alert(datae.msg);
        setlogin(true);
        setleddetail(datae.data[0].ledger)
        localStorage.setItem("name", username);
        localStorage.setItem("email", mail);
        localStorage.setItem("id", id);
        navigate('/');
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
                    onChange={signhandle}
                    name="password"
                    value={signinp.password}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <VpnKeyIcon />
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <RemoveRedEyeIcon />
                        </InputAdornment>
                    }}

                />
                <button onClick={() => submit()}>Login</button>
            </div>
        </>
    )
}

export default Signin;