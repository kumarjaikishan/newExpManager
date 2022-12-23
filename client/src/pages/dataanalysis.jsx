import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './dataanalysis.css';

const Datanalysis = () => {
  const [ledger, setledger] = useState([]);
  const [uniq, setuniq] = useState([]);
  const [show,setshow]=useState(false);
  let totalsum =0;
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
  useEffect(() => {
    load();
  }, [])

  const load = async () => {
    const result = await fetch('/addexpense', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const res = await result.json();
    console.log(res.data)
    let arr = [];
    totalsum=0;
    for (let i = 0; i < res.data.length; i++) {
      arr.push(res.data[i].ledger)
      totalsum= totalsum + res.data[i].amount;
    }
    let unique = [...new Set(arr)];
    setuniq(unique);
    console.log(unique);
    for (let i = 0; i < unique.length; i++) {
      query(unique[i]);
    }
    // query("other");
  }

  const query = async (val) => {
    const result = await fetch('/ledger', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ledger: val
      })
    })
    const res = await result.json();
    // console.log(res.data);
    let sum = 0;
    for (let i = 0; i < res.data.length; i++) {
      sum = sum + res.data[i].amount;
    }
    sume(val, sum);
  }
  
  const sume = (one, two) => {
    // console.log(`for ledger ${one} the sum is ${two}`)
    let id = document.getElementById(one);
    let classe = document.getElementsByClassName(one);
    if(id){
      id.innerText=two;
      classe[0].innerText= Math.ceil((two*100)/totalsum)+"%" ;
    }
     document.getElementById("total").innerText=totalsum;
     setshow(true);
    // console.log("total sum" + totalsum)
  }


  return (
    <>
      <div className="datanalysis" style={{visibility:show ? "visible":"hidden"}}>
        {uniq.map((val, ind) => {
          return (
            <div className="card" key={ind}>
              <div className="data">
                <div className="amt" id={val}>500</div>
                <div className="day">{val}</div>
              </div>
              <div className="icon">
                <div className="cir">
                  <div className={`per ${val}`}> %</div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="card">
          <div className="data">
            <div className="amt" id='total'>00</div>
            <div className="day" >Total</div>
          </div>
          <div className="icon">
            <div className="cir">
              <div className="per" id='totalper'> 100%</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Datanalysis;