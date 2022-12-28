import React from 'react'
import './navbar.css';
import img from '../../img/img.jpg'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ login, narrow, setnarrow, heade }) => {
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
          <div className="photo"><img src={img} alt="" /> </div>
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