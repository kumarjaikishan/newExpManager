import React, { useState } from 'react'
import './addexp.css';

const Addexp = () => {
  const [modal,setmodal]=useState(false);
  const init = {
    ledger:"",
    date:"",
    amount:"",
    narration:""
  }
  const [inp,setinp]=useState(init);
  const handler=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setinp({...inp,[name]:value})
  }
  const sub = ()=>{
    alert(inp.amount)
  }
  return (
    <>
      <div className="exp">
        <div className="add"> <i class="fa fa-plus" onClick={()=> setmodal(true)} aria-hidden="true" id='addexp'></i> </div>
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
          <table cellpadding="7" cellspacing="15">
            <thead cellpadding="30">
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
              <tr>
                <td>1</td>
                <td>General</td>
                <td>2500</td>
                <td>Cash paid for manchunian</td>
                <td>05 aug,2022</td>
                <td>see</td>
                <td>edit</td>
                <td>delete</td>
                <td><input type="checkbox" name="" id="" /></td>
              </tr>
            </tbody>
            <tr id="foot">
              <th colspan="1" ></th>
              <th colspan="1" >Total</th>
              <th colspan="1" id="totalhere">2500</th>
              <th colspan="5" ></th>
              <th colspan="1" id="alldelete" title="Delete"><img src="trash.png"
                alt="All delete" /></th>

            </tr>
          </table>
        </div>
        <div className="foot">
          <span>showing result from</span>
          <span>pages from</span>
        </div>
        <div className="modal" style={{display: modal? "block":"none"}}>
          <div className="box">
            <h1>Add Voucher</h1>
            <div className='v'>
              <span>Ledger</span>
              <span>
                <select name="ledger" id="" onChange={handler} value={inp.ledger} >
                  <option value="">general</option>
                  <option value="Petrol">petrol</option>
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
               <input name="amount" type="text" value={inp.amount} onChange={handler}/>
              </span>
            </div>
            <div>
              <span>Narration</span>
              <span>
               <input name="narration" value={inp.narration} type="text"onChange={handler} />
              </span>
            </div>
            <div>
              <button onClick={sub}>Submit</button>
              <button onClick={()=> setmodal(false) }>Cancel</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Addexp;