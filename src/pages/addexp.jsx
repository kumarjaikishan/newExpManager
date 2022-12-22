import React, { useState } from 'react'
import { useEffect } from 'react';
import './addexp.css';

const Addexp = () => {
  const date = new Date;
  const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();
  console.log(today);
  const init = {
    ledger: "",
    date: today,
    amount: "",
    narration: ""
  }
  const [inp, setinp] = useState(init);
  const [expdata, setexpdata] = useState([]);
  useEffect(() => {
    fetching();
  }, [])

  const fetching = async () => {
    const result = await fetch('/addexpense', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const datae = await result.json();
    setexpdata(datae.data)
    console.log(datae.data);
  }

  const [modal, setmodal] = useState(false);

  const handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinp({ ...inp, [name]: value })
  }
  const sub = async () => {
    const { ledger, date, amount, narration } = inp;
    const result = await fetch('/addexpense', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ledger, date, amount, narration
      })
    })
    const data = await result.json();
    fetching();
    setmodal(false);
    setinp(init);
    console.log(data.msg);
  }
  const edit = async (val) => {
    const result = await fetch('/data', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       id:val
      })
    })
    const datae = await result.json();
    console.log(datae.data[0]);
    setinp(datae.data[0]);
    setmodal(true);
  }

  const delet =async (val) => {
    const result = await fetch('/addexpense', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       id:val
      })
    })
    const data = await result.json();
    console.log(data);
    fetching();
  }

  return (
    <>
      <div className="exp">
        <div className="add"> <i class="fa fa-plus" onClick={() => setmodal(true)} aria-hidden="true" id='addexp'></i> </div>
        <div className="head">
          <span>Expense Voucher List</span>
          <span>
            Record :  <select name="" id="">
              <option value="">5</option>
              <option value="">10</option>
              <option value="">20</option>
              <option value="">50</option>
            </select>
          </span>
          <span><input type="text" placeholder='Type to search...' /></span>
        </div>
        <div className="table">
          <table cellSpacing="15">
            <thead >
              <th>S.no</th>
              <th>Ledger Name</th>
              <th>Amount</th>
              <th>Narration</th>
              <th>Date</th>
              <th>See</th>
              <th>Edit</th>
              <th>Delete</th>
              <th><input type="checkbox" id="allcheck" /></th>
            </thead>
            <tbody id="tablecontent">

              {expdata.map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>{val.ledger}</td>
                    <td>{val.amount}</td>
                    <td>{val.narration}</td>
                    <td>{val.date}</td>
                    <td><i class="fa fa-eye" aria-hidden="true"></i></td>
                    <td><i onClick={() => edit(val._id)} class="fa fa-pencil" aria-hidden="true"></i></td>
                    <td><i onClick={() => delet (val._id)} class="fa fa-trash-o" aria-hidden="true"></i></td>
                    <td><input type="checkbox" name="" id="" /></td>
                  </tr>
                )
              })}
            </tbody>
            <tr id="foot">
              <th colSpan="1" ></th>
              <th colSpan="1" >Total</th>
              <th colSpan="1" id="totalhere">2500</th>
              <th colSpan="5" ></th>
              <th colSpan="1" id="alldelete" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></th>

            </tr>
          </table>
        </div>
        <div className="foot">
          <span>showing result from</span>
          <span>pages from</span>
        </div>
        <div className="modal" style={{ display: modal ? "block" : "none" }}>
          <div className="box">
            <h1>Add Voucher</h1>
            <div className='v'>
              <span>Ledger</span>
              <span>
                <select name="ledger" id="" onChange={handler} value={inp.ledger} >
                  <option value="general">General</option>
                  <option value="ration">Ration</option>
                  <option value="home">Home</option>
                  <option value="petrol">Petrol</option>
                </select>
              </span>
            </div>
            <div>
              <span>Date</span>
              <span>
                <input name="date" type="date" value={inp.date} onChange={handler} />
              </span>
            </div>
            <div>
              <span>Amount</span>
              <span>
                <input name="amount" type="text" value={inp.amount} onChange={handler} />
              </span>
            </div>
            <div>
              <span>Narration</span>
              <span>
                <input name="narration" value={inp.narration} type="text" onChange={handler} />
              </span>
            </div>
            <div>
              <button onClick={sub}>Submit</button>
              <button onClick={() => setmodal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Addexp;