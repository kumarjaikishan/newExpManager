import React from 'react'
import { useEffect } from 'react';
import './home.css';

const Home = ({setloader}) => {
 useEffect(() => {
  setloader(true);
 }, [])
 

  const card = [{
    amt: 500,
    day: "Today",
    icon: <i class="fa fa-inr" aria-hidden="true"></i>
  }, {
    amt: 1500,
    day: "Yesterday",
    icon: <i class="fa fa-bolt" aria-hidden="true"></i>
  }, {
    amt: 2500,
    day: "Last Week",
    icon: <i class="fa fa-shopping-bag" aria-hidden="true"></i>
  }, {
    amt: 3500,
    day: "Last MOnth",
    icon: <i class="fa fa-google-wallet" aria-hidden="true"></i>
  }, {
    amt: 7600,
    day: "Last Year",
    icon: <i class="fa fa-balance-scale" aria-hidden="true"></i>
  }, {
    amt: 52000,
    day: "Total",
    icon: <i class="fa fa-university" aria-hidden="true"></i>
  },{
    amt: 2500,
    day: "Last Week",
    icon: <i class="fa fa-shopping-bag" aria-hidden="true"></i>
  },]
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
       {setloader(false)}

      </div>
    </>
  )
}

export default Home