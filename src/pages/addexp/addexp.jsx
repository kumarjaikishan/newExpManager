import React, { useState } from 'react'
import { useEffect } from 'react';
import './addexp.css';
import Pagination from './pagination';

const Addexp = () => {
  const date = new Date;
  const [isupdate, setisupdate] = useState(false);
  const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();

  const init = {
    ledger: "general",
    date: today,
    amount: "",
    narration: ""
  }

  const [inp, setinp] = useState(init);
  const [expdata, setexpdata] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(3);


  useEffect(() => {
    fetching();
  }, [])

  // for LOading data
  const fetching = async () => {
    const result = await fetch('/addexpense', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const datae = await result.json();
    setexpdata(datae.data)
    // console.log(datae.data);
  }
  // for LOading data ends here


  const [modal, setmodal] = useState(false);

  const handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinp({ ...inp, [name]: value })
  }


  // for creating/inserting data
  const sub = async () => {
    const { ledger, date, amount, narration } = inp;

    if (!ledger || !date || !amount || !narration) {
      return alert("kindly fill all data");
    }

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
    // console.log(data.msg);
  }
  // for creating/inserting data ends here

  //  fecthing data for edit
  const edit = async (val) => {
    const result = await fetch('/data', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: val
      })
    })
    const datae = await result.json();
    // console.log(datae.data[0]);
    setinp(datae.data[0]);
    setisupdate(true);
    setmodal(true);
  }
  //  fecthing data for edit ends here

  // for updating data fetched above 
  const updatee = async (_id) => {
    const { ledger, date, amount, narration } = inp;
    const result = await fetch('/addexpense', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id, ledger, date, amount, narration
      })
    })
    const data = await result.json();
    // console.log(data);
    fetching();
    setinp(init);
    setisupdate(false);
    setmodal(false);
  }
  // for updating data fetched above ends here

  // for deleteing data
  const delet = async (val) => {
    const result = await fetch('/addexpense', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: val
      })
    })
    const data = await result.json();
    // console.log(data);
    fetching();
  }
  // for deleteing data ends here

  const requirede = (e) => {
    setpostperpage(e.target.value);
    setcurrentpage(1);
  }

  const changepageno = (hi) => {
    setcurrentpage(hi);
  }

  const lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;
  
  const currentpost = expdata.slice(firstpostindex, lastpostindex);
  return (
    <>
      <div className="exp">
        <div className="add"> <i class="fa fa-plus" onClick={() => setmodal(true)} aria-hidden="true" id='addexp'></i> </div>
        <div className="head">
          <span>Expense Voucher List</span>
          <span>
            Record :  <select name="" id="" value={postperpage} onChange={requirede}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="100">100</option>
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

              {currentpost.map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td>{firstpostindex + ind + 1}</td>
                    <td>{val.ledger}</td>
                    <td>{val.amount}</td>
                    <td>{val.narration}</td>
                    <td>{val.date}</td>
                    <td><i class="fa fa-eye" aria-hidden="true"></i></td>
                    <td><i onClick={() => edit(val._id)} class="fa fa-pencil" aria-hidden="true"></i></td>
                    <td><i onClick={() => delet(val._id)} class="fa fa-trash-o" aria-hidden="true"></i></td>
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
          <span>showing result from {firstpostindex + 1} to {lastpostindex} of Total {expdata.length}</span>
          <span>Pages :
            <Pagination currentpage={currentpage} changepageno={changepageno} totalpost={expdata.length} postperpage={postperpage} />
          </span>
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
                  <option value="homee">Home</option>
                  <option value="petrol">Petrol</option>
                  <option value="other">Other</option>
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
                <input name="amount"
                  onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                  type="text" value={inp.amount} onChange={handler} />
              </span>
            </div>
            <div>
              <span>Narration</span>
              <span>
                <input name="narration" value={inp.narration} type="text" onChange={handler} />
              </span>
            </div>
            <div>
              {isupdate ? <button onClick={() => updatee(inp._id)}>Update</button> : <button onClick={sub}>Submit</button>}
              <button onClick={() => {
                setmodal(false);
                setisupdate(false);
                setinp(init);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Addexp;
