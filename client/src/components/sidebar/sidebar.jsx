import React from 'react'
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import GrassIcon from '@mui/icons-material/Grass';

const Sidebar = ({ narrow,setheade }) => {
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
    },{
        name:"Login",
        link:'/login',
        logo:"fa fa-user"
    }
]
    return (
        <>
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
                </div>
              
            </div>
        </>
    )
}

export default Sidebar;