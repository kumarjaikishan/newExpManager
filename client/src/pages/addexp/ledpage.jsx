import React, { useState } from 'react'
import './ledpage.css';
import { useEffect } from 'react';

const Ledpage = ({ setmodal, leddetail, setleddetail, isledupdate, setisledupdate }) => {
  const [isupda, setinsupdat] = useState(false)
  const [ledinp, setledinp] = useState({
    ind: "",
    val: ""
  })
  useEffect(() => {
    upde();
  }, [leddetail])

  const upde = async () => {
    const _id = localStorage.getItem("id");
    if(!_id){
      console.log("User id not found");
    }else{
      const res = await fetch('/leg', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          leddetail, _id
        })
      })
      const result = await res.json();
      console.log(result)
    }
   
  }


  const handle = (e) => {
    setledinp({
      ...ledinp, val: e.target.value
    })
  }
  const add = () => {
    setleddetail([
      ...leddetail, ledinp.val
    ])
    setledinp({
      ind: "",
      val: ""
    })
  }
  const edite = (ind, val) => {
    setledinp({
      ind: ind,
      val: val
    })
    setinsupdat(true);

  }


  const deletee = (val) => {
    setleddetail((oldvale) => {
      return oldvale.filter((arr, inde) => {
        return val !== inde;
      })
    })

  }


  const updat = () => {
    //  with splice method
    // leddetail.splice(ledinp.ind, 1, ledinp.val);
    //  with splice method end here

    setleddetail(leddetail.map((vale, inde) => {
      if (inde == ledinp.ind) {
        return ledinp.val;
      }
      return vale;
    }))

    setledinp({
      ind: "",
      val: ""
    })
    setinsupdat(false)
  }

  const back = () => {
    setmodal(true)
    setisledupdate(false)
  }

  return (
    <div className="ledpage" style={{ display: isledupdate ? "block" : "none" }}>
      <div className="box">
        <h2>Hi jai kishan</h2>  <span onClick={back}>Back</span>
        <div className="cont">
          <input type="text" value={ledinp.val} onChange={handle} />

          {isupda ? <button onClick={updat}>Update</button> : <button onClick={add}>Add</button>}
        </div>
        <div className="mater">
          <table>
            <thead>
              <tr>
                <th>Ledger</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {leddetail.map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td>{val}</td>
                    <td><i class="fa fa-pencil" onClick={() => edite(ind, val)} aria-hidden="true" ></i></td>
                    <td><i class="fa fa-trash" onClick={() => deletee(ind)} aria-hidden="true" value={ind} ></i></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Ledpage;