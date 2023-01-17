import React, { useState } from 'react'
import './ledpage.css';
import { useEffect } from 'react';

const Ledpage = ({notification, fetching, setmodal, leddetail, setleddetail, isledupdate, setisledupdate }) => {
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
    // console.log(leddetail)
    if (leddetail.length < 1) {
      return notification.warn("Ledger Can't be blank",2000)
      
    } else {
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
      ...ledinp, val: e.target.value.toLowerCase()
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
        // if (val !== inde) {
        //   return arr;
        // } else {
        //   updateexpledger(arr, "delete", "just");
        // }
        if (leddetail.length == 1) {
          notification.warn("Ledger Can't be blank",2000);
          return arr;
        } else {
          if (val !== inde) {
            return arr;
          } else {
            updateexpledger(arr, "delete", "just");
            notification.success("Ledger has been deleted",2700)
          }
        }
      })
    })
  }


  const updat = () => {
    setleddetail(leddetail.map((vale, inde) => {
      if (inde == ledinp.ind) {
        updateexpledger(vale, "update", ledinp.val);
        return ledinp.val;
      }
      return vale;
    }))

    setledinp({
      ind: "",
      val: ""
    })
    notification.success("Ledger has been Updated",2500)
    setinsupdat(false)
  }

  const updateexpledger = async (oldledger, act, newledger) => {
    const userid = localStorage.getItem("id");
    const res = await fetch('/updateexpledger', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid,
        oldledger,
        action: act,
        newledger
      })
    })
    const result = await res.json();
    console.log(result)
    fetching();
  }


  const back = () => {
    setmodal(true)
    setisledupdate(false)
  }
  var ledpage = document.querySelector(".ledpage");
  const sdef = function (event) {
      if (event.target == ledpage) {
        setisledupdate(false)
      }
  }

  return (
    <div className="ledpage" onClick={sdef} style={{ display: isledupdate ? "block" : "none" }}>
      <div className="box">
        <h2>Hi jai kishan</h2>  <span onClick={back}>Back</span>
        <div className="cont">

          <input type="text" className='caps' value={ledinp.val} onChange={handle} />
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
                    <td><i className="fa fa-pencil" onClick={() => edite(ind, val)} aria-hidden="true" ></i></td>
                    <td><i className="fa fa-trash" onClick={() => deletee(ind)} aria-hidden="true" value={ind} ></i></td>
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