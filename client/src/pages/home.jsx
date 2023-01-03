import React, { useState } from 'react'
import { useEffect } from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

const Home = ({ setloader, login, setheade, expenselist }) => {
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

  const lastday = () => {
    const date = new Date();
    return new Date(date.setDate(date.getDate() - 1));
  }
  const endOfWeek = () => {
    const date = new Date();
    var lastday = date.getDate() - (date.getDay() - 1) - 6;
    return new Date(date.setDate(lastday));
  }
  const endOfMonth = () => {
    const date = new Date();
    return new Date(date.setMonth(date.getMonth() - 1));
  }
  const endOfyear = () => {
    const date = new Date();
    return new Date(date.setYear(date.getFullYear() - 1));
  }

  const today = (a.getFullYear() + "-" + String(a.getMonth() + 1).padStart(2, '0') + "-" + String(a.getDate()).padStart(2, '0'));
  const yesterday = (lastday().getFullYear() + "-" + String(lastday().getMonth() + 1).padStart(2, '0') + "-" + String(lastday().getDate()).padStart(2, '0'));
  const lastweek = (endOfWeek().getFullYear() + "-" + String(endOfWeek().getMonth() + 1).padStart(2, '0') + "-" + String(endOfWeek().getDate()).padStart(2, '0'));
  const lastmonth = (endOfMonth().getFullYear() + "-" + String(endOfMonth().getMonth() + 1).padStart(2, '0') + "-" + String(endOfMonth().getDate()).padStart(2, '0'));
  const lastyear = ((endOfyear().getFullYear()) + "-" + String(endOfyear().getMonth() + 1).padStart(2, '0') + "-" + String(endOfyear().getDate()).padStart(2, '0'));
  
  const [arr,setarr]= useState([]);
  let todaysum = 0;
  let yestersum = 0;
  let weeksum = 0;
  let monthsum = 0;
  let yearsum = 0;
  let totalsum = 0;
  const load = () => {
    expenselist.map((val, ind) => {
      if (val.date == today) {
        todaysum = todaysum + val.amount
      }
      if (val.date == yesterday) {
        yestersum = yestersum + val.amount
      }
      if (val.date >= lastweek && val.date <= today) {
        weeksum = weeksum + val.amount
      }
      if (val.date >= lastmonth && val.date <= today) {
        monthsum = monthsum + val.amount
      }
      if (val.date >= lastyear && val.date <= today) {
        yearsum = yearsum + val.amount
      }
      
      totalsum = totalsum + val.amount
    })
    setarr({
      todaysum:todaysum,
      yestersum:yestersum,
      weeksum:weeksum,
      monthsum:monthsum,
      yearsum:yearsum,
      totalsum:totalsum
    })
    // console.log(yearsum);
    // setloader(false);
  }
  const card = [{
    amt: arr.todaysum,
    day: "Today",
    icon: <i className="fa fa-inr" aria-hidden="true"></i>
  }, {
    amt:arr.yestersum,
    day: "Yesterday",
    icon: <i className="fa fa-bolt" aria-hidden="true"></i>
  }, {
    amt:arr.weeksum,
    day: "Last Week",
    icon: <i className="fa fa-shopping-bag" aria-hidden="true"></i>
  }, {
    amt: arr.monthsum,
    day: "Last Month",
    icon: <i className="fa fa-google-wallet" aria-hidden="true"></i>
  }, {
    amt: arr.yearsum,
    day: "Last Year",
    icon: <i className="fa fa-balance-scale" aria-hidden="true"></i>
  }, {
    amt: arr.totalsum,
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