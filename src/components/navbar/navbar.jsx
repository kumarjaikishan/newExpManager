import React from 'react'
import './navbar.css';
import img from '../../img/img.jpg'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({narrow,setnarrow}) => {
  const fun=()=>{
    if(narrow){
      setnarrow(false)
    }else{
      setnarrow(true)
    }
  }
  return (
   <>
   <div className={narrow ? "nav narrow":"nav"}>
    <div className="cont">
      <span onClick={fun}><MenuIcon/></span>
      <span>Dashboard </span>
    </div>
    <div className="info">
      <div className="photo"><img src={img} alt="" /></div>
      <div className="userinfo">
        <span>kishan</span>
        <span>user</span>
      </div>
    </div>
   </div>
   </>
  )
}

export default Navbar;