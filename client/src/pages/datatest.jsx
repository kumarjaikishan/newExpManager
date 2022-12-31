import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './dataanalysis.css';
import { useNavigate } from "react-router-dom";

const Datanalysis = ({ setloader, login, expenselist, leddetail }) => {
    let navigate = useNavigate();

    const date = new Date;
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();
    const [inp, setinp] = useState({
        date: today,
        month: date.getMonth(),
        year: "2022"
    })
    const [cardarr, setcardarr] = useState([]);
    const temparr = [];
    useEffect(() => {
        if (!login) {
            navigate('/login');
            return;
        }
        // setloader(true);
        fcuk();
    }, [inp])

    const fcuk = async () => {
        let month = (parseInt(inp.month) + 1);
        if (month < 10) {
            month = "0" + month;
        }
        const startdate = inp.year + "-" + month + "-01";
        const enddate = inp.year + "-" + month + "-31";
        //  alert(startdate + "  : "+ enddate);
        const temp = expenselist.filter((val, ind) => {
            if (val.date >= startdate && val.date <= enddate) {
                return val;
            }
        })
        // console.log(temp);

        let Totalsum = 0;
        temp.map((rfr, re) => {
            return Totalsum = Totalsum + rfr.amount
        })

        leddetail.map((val, ind) => {
            let ledsum = 0;
            temp.map((vale, inde) => {
                if (val == vale.ledger) {
                    return ledsum = ledsum + vale.amount
                }
            })
            let percente = Math.round((ledsum * 100) / Totalsum);

            if (Totalsum == 0) {
                temparr.push({
                    name: val,
                    sum: ledsum,
                    percent: 0
                })
            } else {
                temparr.push({
                    name: val,
                    sum: ledsum,
                    percent: percente
                })
            }

        })

        temparr.push({
            name: "Total",
            sum: Totalsum,
            percent: 100
        })
        // console.log(temparr);
        setcardarr(temparr);
        // setloader(false);
    }

    const monname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const handle = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setinp((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    return (
        <>
            <div className="datanalysis" >
                <div className="cont">
                    {/* <span>
                        <input onChange={handle} type="date" name="date" value={inp.date} id="" />
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </span> */}
                    <span>
                        Month :  <select onChange={handle} name="month" value={inp.month} id="">
                            {monname.map((val, ind) => {
                                return <option key={ind} value={ind}>{val}</option>
                            })}
                        </select>
                    </span>
                    <span>
                        Year :  <select onChange={handle} name="year" value={inp.year} id="">
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                        {/* <i  className="fa fa-search" aria-hidden="true"></i> */}
                    </span>
                </div>
                <div className="cards">
                    {cardarr.map((val, ind) => {
                        return (
                            <div className="card" key={ind} id={val}>
                                <div className="data">
                                    <div className="amt" >{val.sum}</div>
                                    <div className="day">{val.name}</div>
                                </div>
                                <div className="icon">
                                    <div className="cir" style={{ background: `conic-gradient(#fc5c65 ${val.percent * 3.6}deg,  #7f8fa6  10.8deg)` }}>
                                        <div className="per"> {val.percent}%</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Datanalysis;