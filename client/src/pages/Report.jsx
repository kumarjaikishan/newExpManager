import React, { useState } from 'react'
import { useEffect } from 'react';
import './report.css';
import { useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv';

const Report = ({ leddetail, login, setloader, expenselist }) => {
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
    const header = [
        { label: "ledger", key: "ledger" },
        { label: "amount", key: "amount" },
        { label: "date", key: "date" },
        { label: "narration", key: "narration" }
    ]
    const username = localStorage.getItem("name");
    const [explist, setexplist] = useState([]);
    const [issearch, setissearch] = useState(false);
    const [pious, setpious] = useState(explist);
    const date = new Date;

    const lastday = () => {
        const date = new Date();
        return new Date(date.setDate(date.getDate() - 1));
    }

    var monthIn2Digit = String(date.getMonth() + 1).padStart(2, '0');
    var dateIn2Digit = String(date.getDate()).padStart(2, '0');

    const today = date.getFullYear() + "-" + monthIn2Digit + "-" + dateIn2Digit;
    const yesterday = (lastday().getFullYear() + "-" + String(lastday().getMonth() + 1).padStart(2, '0') + "-" + String(lastday().getDate()).padStart(2, '0'));
    const [inp, setinp] = useState({
        from: yesterday,
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
    const hello = () => {
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
                            <i onClick={search} title='Search' className="fa fa-search" aria-hidden="true"></i>
                        </span>
                        {issearch ? <button onClick={hello}>Clear</button> : null}
                    </span>
                    <span>
                        <CSVLink data={pious} headers={header} filename={`${username}-Expense Record`}>
                            <button title='Download'>Download csv</button>
                        </CSVLink>
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

                                var dateIn2Digit2 = String(daten.getDate()).padStart(2, '0');
                                let fde = dateIn2Digit2 + " " + daten.toLocaleString('default', { month: 'short' }) + ", " + daten.getFullYear().toString().substr(-2);
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