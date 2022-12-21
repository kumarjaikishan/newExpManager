import React from 'react'
import './home.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Home = () => {
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
    icon:<i class="fa fa-shopping-bag" aria-hidden="true"></i>
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
    icon: <i class="fa fa-shopping-bag" aria-hidden="true"></i>
  }]
  return (
    <>
      <div className="home">

        {card.map((val, ind) => {
          return (
            <div className="card">
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