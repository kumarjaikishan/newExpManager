import React from 'react'
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import GrassIcon from '@mui/icons-material/Grass';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ narrow,setheade,login }) => {
    const notify = (msg,dur) => {
        toast.success(msg,{
          autoClose: dur,
        });
      }
    const linke = [{
        name:"Dashboard",
        link:'/',
        logo:"fa fa-tachometer"
    },{
        name:"Add Expense",
        link:'/addexpense',
        logo:"fa fa-university"
    },{
        name:"Data Alaysis",
        link:'/datanalysis',
        logo:"fa fa-anchor"
    }
] 
const fr=()=>{
    setheade("Log out");
    notify("Logout successfull",2000)
}
    return (
        <>
        <ToastContainer />
            <div className={narrow ? "sidebar narrow" : "sidebar"}>
                <div className="clogo">
                    <NavLink exact className={(navData) => (navData.isActive ? 'active' : '')} style={{ textDecoration: 'none' }} to='/' > <span className="li" ><span className="logo"> <GrassIcon className='company'/></span><span className="name">Accusoft</span></span></NavLink>
                </div>
                <div className="link">
                 {linke.map((val,ind)=>{
                    return(
                        <NavLink key={ind} title={val.name}  exact className={(navData) => (navData.isActive ? 'active' : '')} style={{ textDecoration: 'none' }} to={val.link} > <span className="li" onClick={()=>setheade(val.name)}><span className="logo"><i class={val.logo} aria-hidden="true"></i></span><span className="name">{val.name}</span></span></NavLink>
                    )
                 })}
                 {login? <NavLink    exact className={(navData) => (navData.isActive ? 'active' : '')} style={{ textDecoration: 'none' }} to="/logout" > <span className="li" onClick={fr}><span className="logo"><i class="fa fa-sign-out" aria-hidden="true"></i></span><span className="name">Logout</span></span></NavLink> : <NavLink   exact className={(navData) => (navData.isActive ? 'active' : '')} style={{ textDecoration: 'none' }} to="/login" > <span className="li" onClick={()=>setheade("Login")}><span className="logo"><i class="fa fa-user" aria-hidden="true"></i></span><span className="name">Login</span></span></NavLink>} 
                  
                </div>
              
            </div>
        </>
    )
}

export default Sidebar;