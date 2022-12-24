import React, { useState } from 'react'
import swal from 'sweetalert'

const Modalbox = ({leddetail, modal, fetching, init, handler, inp, isupdate, sub, setmodal, setisupdate, setinp }) => {
   
    const lededit = async () => {
        alert("ok")
    }
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
            swal({
                title: "Wait!",
                text: "Data updated Successfully",
                icon: "success",
            });
        }
        // console.log(data);
        fetching();
        setinp(init);
        setisupdate(false);
        setmodal(false);
    }
    // for updating data fetched above ends here

    return (
        <div className="modal" style={{ display: modal ? "block" : "none" }}>
            <div className="box">
                <h1>Add Voucher</h1>
                <div className="ledgeredit"><i onClick={() => lededit()} class="fa fa-pencil" aria-hidden="true"></i></div>
                <div className='v'>
                    <span>Ledger :</span>
                    <span>
                        <select name="ledger" id="" onChange={handler} value={inp.ledger} >
                            <option value="general">General</option>
                            <option value="ration">Ration</option>
                            <option value="homee">Home</option>
                            <option value="petrol">Petrol</option>
                            <option value="other">Other</option>
                            {leddetail.map((val,ind)=>{
                                return <option key={ind} value={val}>{val}</option>
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
                            type="text" value={inp.amount} onChange={handler} />
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