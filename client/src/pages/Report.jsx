import React, { useState } from 'react'
import { useEffect } from 'react';
import './report.css';
import { useNavigate } from "react-router-dom";

const Report = ({ leddetail, login, setloader,expenselist }) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!login) {
            navigate('/login');
            return;
        }
        setloader(true)
        setexplist(expenselist);
        fetching();
    }, [])
    const [explist, setexplist] = useState([]);
    const [issearch, setissearch] = useState(false);
    const [pious, setpious] = useState(explist);
    const date = new Date;
    const yester = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getUTCDate() - 1);
    const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();
    const [inp, setinp] = useState({
        from: yester,
        to: today,
        ledger: "all"
    });

    const handler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setinp((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    // for LOading data
    const fetching = async () => {
            setpious(expenselist)
            setloader(false);
    }
    // for LOading data ends here

    // for handling search
    const search = () => {
        setissearch(true);
        let searchitem;
        if (inp.ledger == "all") {
            searchitem = explist.filter((val, ind) => {
                if (val.date >= inp.from && val.date <= inp.to) {
                    return val;
                }
            })
        } else {
            searchitem = explist.filter((val, ind) => {
                if (val.date >= inp.from && val.date <= inp.to && val.ledger == inp.ledger) {
                    return val;
                }
            })
        }
        setpious(searchitem);
    }
    const hello = ()=>{
        setissearch(false);
        setpious(explist);
    }
    return (
        <>
            <div className="report">
                {explist.length > 25 ? <span className='scrol'>
                    <span id="bottom"><a href="#foot"><i title='Go to Bottom' className="fa fa-arrow-down" aria-hidden="true"></i></a></span>
                    <span id="top"><a href="#table"><i title='Go to Top' className="fa fa-arrow-up" aria-hidden="true"></i></a></span>
                </span> : null}

                <div className="cont">
                    <span>
                        <span>
                            From: <input value={inp.from} onChange={handler} type="date" name="from" id="" />
                        </span>
                        <span>
                            To: <input value={inp.to} onChange={handler} type="date" name="to" id="" />
                        </span>
                        <span>
                            Select Ledger : <select value={inp.ledger} onChange={handler} name="ledger" id="">
                                <option value="all">All</option>
                                {leddetail.map((val, ind) => {
                                    return <option key={ind} value={val}>{val}</option>
                                })}
                            </select>
                        </span>
                        <span>
                            <i onClick={search} title='Search' class="fa fa-search" aria-hidden="true"></i>
                        </span>
                        {issearch ? <button onClick={hello}>Clear</button> : null}
                    </span>
                    <span>
                        <button title='Download'>Download csv</button>
                        <button title='Print' onClick={() => window.print()}>Print</button>
                    </span>
                </div>
                <div className="table" >
              
                    <table id='tavlecontent'>
                        <thead id='table'>
                            <tr>
                                <th>S.no</th>
                                <th>Ledger</th>
                                <th>Amount</th>
                                <th>Narration</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pious.map((val, ind) => {
                                let daten = new Date(val.date);
                                let fde = daten.getUTCDate() + " " + daten.toLocaleString('default', { month: 'short' }) + ", " + daten.getFullYear().toString().substr(-2);
                                return (
                                    <tr key={ind}>
                                        <td>{ind + 1}</td>
                                        <td>{val.ledger}</td>
                                        <td>{val.amount}</td>
                                        <td>{val.narration}</td>
                                        <td>{fde}</td>
                                    </tr>
                                )
                            })}

                            <tr id='foot'>
                                <td colSpan={2}>Total</td>
                                <td colSpan={1} >
                                    {pious.reduce((accu, val) => {
                                        return accu = accu + val.amount
                                    }, 0)}
                                </td>
                                <td colSpan={2} ></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Report;