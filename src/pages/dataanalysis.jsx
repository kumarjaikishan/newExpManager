import React from 'react'
import './dataanalysis.css';
const Datanalysis = () => {
  const card = [{
    amt: "8521",
    ledger: "General",
    percentage: 3
  },
  {
    amt: "874",
    ledger: "Petrol",
    percentage: 16
  }]
  return (
    <>
      <div className="datanalysis">
        {card.map((val, ind) => {
          return (
            <div className="card" key={ind}>
              <div className="data">
                <div className="amt">{val.amt}</div>
                <div className="day">{val.ledger}</div>
              </div>
              <div className="icon">
            <div className="cir">
              <div className="per"> {val.percentage}%</div>
            </div>
          </div>
            </div>
          )
        })}
        <div className="card">
          <div className="data">
            <div className="amt">8500</div>
            <div className="day">Total</div>
          </div>
          <div className="icon">
            <div className="cir">
              <div className="per"> 100%</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Datanalysis;