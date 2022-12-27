import React, { useState } from 'react'
import { useEffect } from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

const Home = ({ setloader, login, setheade }) => {
  const [arr,setarr]=useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
      return;
    }
    load();
    setheade("Dashboard");
    setloader(true);
  }, [])

  const load = async () => {
    const userid = localStorage.getItem("id");
    const result = await fetch('/homeload', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid
      })
    })
    const res = await result.json();
    console.log(res.data[0])
    setarr(res.data[0]);
    setloader(false);
  }
  const card = [{
    amt: arr.Today,
    day: "Today",
    icon: <i class="fa fa-inr" aria-hidden="true"></i>
  }, {
    amt:  arr.Yesterday,
    day: "Yesterday",
    icon: <i class="fa fa-bolt" aria-hidden="true"></i>
  }, {
    amt:  arr.LastWeek,
    day: "Last Week",
    icon: <i class="fa fa-shopping-bag" aria-hidden="true"></i>
  }, {
    amt:  arr.LastMonth,
    day: "Last Month",
    icon: <i class="fa fa-google-wallet" aria-hidden="true"></i>
  }, {
    amt:  arr.lastyear,
    day: "Last Year",
    icon: <i class="fa fa-balance-scale" aria-hidden="true"></i>
  }, {
    amt:  arr.total,
    day: "Total",
    icon: <i class="fa fa-university" aria-hidden="true"></i>
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