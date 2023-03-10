import React, { useState } from 'react'
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const Navbar = ({ login, narrow, setnarrow, heade ,imgine}) => {
  const username = localStorage.getItem("name");

  const fun = () => {
    if (narrow) {
      setnarrow(false)
    } else {
      setnarrow(true)
    }
  }
  return (
    <>
      <div className={narrow ? "nav narrow" : "nav"}>
        <div className="cont">
          <span onClick={fun}><MenuIcon /></span>
          <span>{heade} </span>
        </div>
        {login ? <div className="info">
        <NavLink to='/photo' > <div className="photo"><img src={'img/' + imgine} alt="" /> </div> </NavLink>
          <div className="userinfo">
            <span>{username}</span>
            <span>User</span>
          </div>
        </div> : null}
      </div>
    </>
  )
}

export default Navbar;