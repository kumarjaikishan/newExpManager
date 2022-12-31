import React, { useState } from 'react'
import swal from 'sweetalert'
import './modalbox.css';

const Modalbox = ({notify,setisledupdate,leddetail, modal, fetching, init, handler, inp, isupdate, sub, setmodal, setisupdate, setinp }) => {
   
    const [ledarr,setledarr]= useState([]);
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
        if (data) {
            notify("Data updated Successfully",2500)
        }
        // console.log(data);
        fetching();
        setinp(init);
        setisupdate(false);
        setmodal(false);
    }
    // for updating data fetched above ends here
   const jkh=()=>{
    setisledupdate(true);
    setmodal(false)
   }
    return (
        <div className="modal" style={{ display: modal ? "block" : "none" }}>
            <div className="box">
                <h1>Add Voucher</h1>
                <div className="ledgeredit"><i onClick={jkh} className="fa fa-pencil" aria-hidden="true"></i></div>
                <div className='leger'>
                    <span>Ledger :</span>
                    <span>
                        <select className='caps' name="ledger" id="" onChange={handler} value={inp.ledger} >
                            {leddetail.map((val,ind)=>{
                                return <option className='erffeg' key={ind} value={val}>{val}</option>
                            })}
                        </select>
                    </span>
                </div>
                <div>
                    <span>Date :</span>
                    <span>
                        <input name="date" type="date" value={inp.date} onChange={handler} />
                    </span>
                </div>
                <div>
                    <span>Amount :</span>
                    <span>
                        <input name="amount"
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            type="tel" value={inp.amount} onChange={handler} />
                    </span>

                </div>
                <div>
                    <span>Narration :</span>
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
    )
}

export default Modalbox;