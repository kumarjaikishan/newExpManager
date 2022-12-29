import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './dataanalysis.css';
import { useNavigate } from "react-router-dom";

const Datanalysis = ({ setloader, login }) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!login) {
            navigate('/login');
            return;
        }
        load();
        setloader(true);
    }, [])
    const monname=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const date = new Date;
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();
    const [inp,setinp]= useState({
        date:today,
        month:date.getMonth(),
        year:"2022"
    })
    const [fetchdata, setfetchdata] = useState([]);
    const [uniq, setuniq] = useState([]);
    let totalsum = 0;
   
    const load = async () => {
        const userid = localStorage.getItem("id");
        const result = await fetch('/explist', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid
            })
        })
        const res = await result.json();
        setfetchdata(res.data);
        // console.log(res.data)
        let arr = [];
        totalsum = 0;
        for (let i = 0; i < res.data.length; i++) {
            arr.push(res.data[i].ledger)
            totalsum = totalsum + res.data[i].amount;
        }
        let unique = [...new Set(arr)];
        setuniq(unique);
        // console.log(unique);
        for (let i = 0; i < unique.length; i++) {
            query(unique[i]);
        }
       console.log(monname[2]) 
    }

    const query = async (val) => {
        const userid = localStorage.getItem("id");
        const result = await fetch('/ledger', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid,
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
        let amount = document.querySelector("#" + one).querySelector(".amt");
        let circle = document.querySelector("#" + one).querySelector(".icon").querySelector(".cir");
        let percent = document.querySelector("#" + one).querySelector(".icon").querySelector(".per");

        //    console.log(circle);

        if (amount) {
            let percalculate = Math.ceil((two * 100) / totalsum);
            amount.innerText = two;
            percent.innerText = percalculate + "%";
            circle.style.background = `conic-gradient(#fc5c65 ${percalculate * 3.6}deg,
                    #7f8fa6  10.8deg)`
        }

        document.querySelector('.tothun').style.background = `conic-gradient(#fc5c65 ${100 * 3.6}deg,
                #7f8fa6  10.8deg)`
        setloader(false);
    }
   const handle=(e)=>{
let name = e.target.name;
let value = e.target.value;
setinp((prev)=>{
    return {
        ...prev , [name]:value
    }
})
   }

    return (
        <>
            <div className="datanalysis" >
                <div className="cont">
                    <span>
                      <input onChange={handle} type="date" name="date" value={inp.date} id="" />
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </span>
                    <span>
                       <select onChange={handle} name="month" value={inp.month} id="">
                        {monname.map((val,ind)=>{
                            return  <option key={ind} value={ind}>{val}</option>
                        })}
                       </select>
                    </span>
                    <span>
                          <select onChange={handle} name="year" value={inp.year} id="">
                           <option value="2022">2022</option>
                          </select>
                          <i class="fa fa-search" aria-hidden="true"></i>
                    </span>
                </div>
                <div className="cards">
                    {uniq.map((val, ind) => {
                        return (
                            <div className="card" key={ind} id={val}>
                                <div className="data">
                                    <div className="amt" >500</div>
                                    <div className="day">{val}</div>
                                </div>
                                <div className="icon">
                                    <div className="cir">
                                        <div className="per"> %</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="card">
                        <div className="data">
                            <div className="amt" id='total'>
                                {fetchdata.reduce((accu, val, ind) => {
                                    return accu = accu + val.amount;
                                }, 0)}
                            </div>
                            <div className="day" >Total</div>
                        </div>
                        <div className="icon">
                            <div className="cir tothun">
                                <div className="per" id='totalper'> 100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Datanalysis;