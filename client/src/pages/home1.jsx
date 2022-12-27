import React, { useState } from 'react'
import { useEffect } from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

const Homen = ({ setloader, login, setheade }) => {
    useEffect(() => {
        load();
    }, [])

    const load = async () => {

        const a = new Date();
        // const today = a.toDateString();
        // const today = 2022/12/27;
        const today = (a.getMonth() + 1) + "/" + a.getDate() + "/" + a.getFullYear();
        const yesterday = (a.getMonth() + 1) + "/" + (a.getDate() - 1) + "/" + a.getFullYear();
        const lastweek = (a.getMonth() + 1) + "/" + (a.getDate() - 7) + "/" + a.getFullYear();
        const lastmonth = (a.getMonth()) + "/" + a.getDate() + "/" + a.getFullYear();
        const lastyear = (a.getMonth() + 1) + "/" + a.getDate() + "/" + (a.getFullYear() - 1);

        const userid = localStorage.getItem("id");
        const result = await fetch('/test', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid
            })
        })
        const res = await result.json();
        console.log(res.data)
        // setarr(res.data[0]);
        // setloader(false);
        const yesterdaysum =await res.data.reduce((accu, val, ind) => {
            // if (val.date >= yesterday && val.date <= today) {
                return accu = accu + val.amount
            // }
        }, 0)
        console.log("yesterday sum :" +yesterdaysum );
    }

    return (
        <>
            <div className="home">

                <h2>hi</h2>
            </div>
        </>
    )
}

export default Homen;