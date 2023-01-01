import React, { useState } from 'react'
import { useEffect } from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

const Home = ({ setloader, login, setheade,expenselist }) => {
  const [arr,setarr]=useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
      return;
    }
    load();
    setheade("Dashboard");
    // setloader(true);
  }, [])


  const a = new Date();
  // const today = a.toDateString();
  // const today = 2022/12/27;
  const today = (a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate());
  const yesterday = (a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + (a.getDate() - 1));
  const lastweek = (a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + (a.getDate() - 7));
  const lastmonth = (a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate());
  const lastyear = ((a.getFullYear() - 1) + "-" + (a.getMonth() + 1) + "-" + a.getDate());

  const load =  () => {
    var dateIn2Digit = String(a.getDate()).padStart(2, '0');
    console.log(dateIn2Digit);
    // const userid = localStorage.getItem("id");
    // const result = await fetch('/homeload', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     userid
    //   })
    // })
    // const res = await result.json();
    // console.log(res.data[0])
    // setarr(res.data[0]);
    let dvdf;
    let sumarr = [];
    dvdf= expenselist.map((val,ind)=>{
        let dvds =0;
        if(val.date==today){
            dvds = dvds + val.amount 
        }
    //   console.log("reduce dta :" + val.date)
    //   console.log(dvds)
    })
    // console.log(dvdf);
    setloader(false);
  }
  const card = [{
    amt: arr.Today,
    day: "Today",
    icon: <i className="fa fa-inr" aria-hidden="true"></i>
  }, {
    amt:  arr.Yesterday,
    day: "Yesterday",
    icon: <i className="fa fa-bolt" aria-hidden="true"></i>
  }, {
    amt:  arr.LastWeek,
    day: "Last Week",
    icon: <i className="fa fa-shopping-bag" aria-hidden="true"></i>
  }, {
    amt:  arr.LastMonth,
    day: "Last Month",
    icon: <i className="fa fa-google-wallet" aria-hidden="true"></i>
  }, {
    amt:  arr.lastyear,
    day: "Last Year",
    icon: <i className="fa fa-balance-scale" aria-hidden="true"></i>
  }, {
    amt:  arr.total,
    day: "Total",
    icon: <i className="fa fa-university" aria-hidden="true"></i>
  }]
  return (
    <>
      <div className="home">

        {card.map((val, ind) => {
          return (
            <div className="card" key={ind}>
              <div className="data">
                <div className="amt">{val.amt}</div>
                <div className="day">{val.day}</div>
              </div>
              <div className="icon">{val.icon}</div>
            </div>
          )
        })}
        

      </div>
    </>
  )
}

export default Home