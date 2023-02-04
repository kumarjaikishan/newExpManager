import React from 'react'
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import GrassIcon from '@mui/icons-material/Grass';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ narrow, setheade, login }) => {
    let navigate = useNavigate();
    const notify = (msg, dur) => {
        toast.success(msg, {
            autoClose: dur,
        });
    }
    const linke = [{
        name: "Dashboard",
        link: '/',
        logo: "fa fa-tachometer"
    }, {
        name: "Expenses",
        link: '/addexpense',
        logo: "fa fa-university"
    }, {
        name: "Data Alaysis",
        link: '/datanalysis',
        logo: "fa fa-anchor"
    }, {
        name: "Report",
        link: '/report',
        logo: "fa fa-cloud-download"
    }
    ]
    const fr = () => {
        swal({
            title: "Are you sure to Logout?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
                if (willDelete) {
                    setheade("LogIn");
                    notify("Logout successfull", 2000)
                    navigate('/logout');
                } else {
                    // swal("Your data is safe!");
                }
            });
    }
    return (
        <>
            <ToastContainer />
            <div className={narrow ? "sidebar narrow" : "sidebar"}>
                <div className="clogo">
                    <NavLink className={(navData) => (navData.isActive ? 'active' : '')} style={{ textDecoration: 'none' }} to='/' > <span className="li" ><span className="logo"> <GrassIcon className='company' /></span><span className="name">Accusoft</span></span></NavLink>
                </div>
                <div className="link">
                    {login ? linke.map((val, ind) => {
                        return (
                            <NavLink key={ind} className={(navData) => (navData.isActive ? 'active' : '')} style={{ textDecoration: 'none' }} to={val.link} > <span className="li" onClick={() => setheade(val.name)}><span className="logo"><i title={val.name} className={val.logo} aria-hidden="true"></i></span><span className="name">{val.name}</span></span></NavLink>
                        )
                    }) : null}

                    {login ? <span className="li" onClick={fr}><span className="logo"><i title='Sign Out' className="fa fa-sign-out" aria-hidden="true"></i></span><span className="name">Logout</span></span> : <NavLink className={(navData) => (navData.isActive ? 'active' : '')} style={{ textDecoration: 'none' }} to="/login" > <span className="li" onClick={() => setheade("Login")}><span className="logo"><i title='Sign In' className="fa fa-user" aria-hidden="true"></i></span><span className="name">Login</span></span></NavLink>}

                </div>

            </div>
        </>
    )
}

export default Sidebar;