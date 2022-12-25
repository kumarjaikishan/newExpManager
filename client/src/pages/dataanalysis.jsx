import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './dataanalysis.css';

const Datanalysis = ({ setloader }) => {
    const [ledger, setledger] = useState([]);
    const [uniq, setuniq] = useState([]);
    let totalsum = 0;
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
        setloader(true);
    }, [])

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
        // query("other");
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
        document.getElementById("total").innerText = totalsum;
        setloader(false);
    }


    return (
        <>
            <div className="datanalysis" >
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
                        <div className="amt" id='total'>00</div>
                        <div className="day" >Total</div>
                    </div>
                    <div className="icon">
                        <div className="cir tothun">
                            <div className="per" id='totalper'> 100%</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Datanalysis;