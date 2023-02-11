import React, { useState } from 'react'
import { useEffect } from 'react';
import './addexp.css';
import swal from 'sweetalert'
import Pagination from './pagination';
import Modalbox from './modalbox';
import Ledpage from './ledpage';
import { useNavigate } from "react-router-dom";


const Addexp = ({ setexpenselist, login, setloader, leddetail, setleddetail, expenselist, notification }) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
      return;
    }
    // setloader(true)
  }, [])



  const date = new Date;
  const [serinp, setserinp] = useState("");
  const [isupdate, setisupdate] = useState(false);
  let dfbdf = (date.getMonth() + 1);
  let dfbfvfddf = date.getUTCDate();
  if (dfbdf < 10) {
    dfbdf = "0" + dfbdf;
  }
  if (dfbfvfddf < 10) {
    dfbfvfddf = "0" + dfbfvfddf;
  }

  const today = date.getFullYear() + "-" + dfbdf + "-" + dfbfvfddf;

  const init = {
    userid: "",
    ledger: "general",
    date: today,
    amount: "",
    narration: ""
  }
  const [isledupdate, setisledupdate] = useState(false);
  const [inp, setinp] = useState(init);
  const [expdata, setexpdata] = useState(expenselist);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(10);


  // for LOading data
  const fetching = async () => {
    const userid = localStorage.getItem("id");
    if (!userid) {
      console.log("user id not found");
    } else {
      const result = await fetch('/explist', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid
        })
      })
      const datae = await result.json();
      setloader(false);
      setexpdata(datae.data)
      setexpenselist(datae.data);
    }
  }
  // for LOading data ends here


  const [modal, setmodal] = useState(false);

  const handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinp({ ...inp, [name]: value })
  }

  const cap = (val) => {
    let cop = val.split(' ');
    let final = "";
    for (let i = 0; i < cop.length; i++) {
      let hi = cop[i].toLowerCase().charAt(0).toUpperCase();
      let ho = cop[i].toLowerCase().slice(1);
      final += hi + ho;

      if (((cop.length) - 1) !== i) {
        final += " ";
      }
    }
    return final;
  }

  // for creating/inserting data
  const sub = async () => {
    setloader(true)
    let { ledger, date, amount, narration } = inp;
    narration = cap(narration);
    const userid = localStorage.getItem("id");
    if (!userid || !ledger || !date || !amount || !narration) {
      return notification.warn("Kindly Fill all Fields", 2500)
    } else {
      const result = await fetch('/addexpense', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid, ledger, date, amount, narration
        })
      })
      const data = await result.json();
      fetching();
      notification.success("Expense Added", 3000);
      setmodal(false);
      setinp(init);
      // console.log(data.msg);
    }
  }
  // for creating/inserting data ends here

  //  fecthing data for edit
  const edit = async (val) => {
    setloader(true);
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
    setloader(false);
  }
  //  fecthing data for edit ends here

  // for deleteing data
  const delet = async (val) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          setloader(true);
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
          notification.success("Deleted Successfully", 2000);
        } else {
          // swal("Your data is safe!");
        }
      });
  }
  // for deleteing data ends here

  // for sending multiple delete request
  const senddelete = async () => {
    const item = document.querySelectorAll("#tablecontent input");
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          setloader(true);
          const arr = [];
          for (let i = 0; i < item.length; i++) {
            if (item[i].checked == true) {
              arr.push(item[i].id)
            }
          }

          if (arr.length < 1) {
            notification.warn("Kindly Select data", 2000);
          } else {
            const result = await fetch('/delmany', {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                id: arr
              })
            })
            const data = await result.json();
            notification.success("Deleted Successfully", 2000);
            fetching();

            const item = document.querySelectorAll("#tablecontent input");
            const tr = document.querySelectorAll("#tablecontent tr");
            for (let i = 0; i < item.length; i++) {
              item[i].checked = false;
            }

            highlight();
          }
        } else {
          swal("Your data is safe!");
        }

      })
  }
  // for sending multiple delete request ends here

  // for selecting all checkbox
  const allselect = () => {
    const it = document.querySelector("#allcheck");
    const item = document.querySelectorAll("#tablecontent input");
    if (it.checked == true) {
      for (let i = 0; i < item.length; i++) {
        item[i].checked = true
      }
    } else {
      for (let i = 0; i < item.length; i++) {
        item[i].checked = false;
      }
    }
    highlight();
  }

  // for selecting all checkbox ends here

  const requirede = (e) => {
    setpostperpage(e.target.value);
    setcurrentpage(1);
  }

  const changepageno = (hi) => {
    setcurrentpage(hi);
  }

  const sear = (e) => {
    setserinp(e.target.value);
  }


  const highlight = () => {
    const item = document.querySelectorAll("#tablecontent input");
    const tr = document.querySelectorAll("#tablecontent tr");

    for (let i = 0; i < item.length; i++) {
      var parent = item[i].parentNode.parentNode;
      if (item[i].checked) {
        parent.style.background = "rgb(16 135 129)";
        parent.style.color = "white";
      } else {
        parent.style.background = "transparent";
        parent.style.color = "black";
      }
    }
  }

  let lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;

  const currentpost = expdata.slice(firstpostindex, lastpostindex);


  let sum = 0;
  return (
    <>
      <div className="exp">
        <div className="add"> <i title='Add Expense' className="fa fa-plus" onClick={() => setmodal(true)} aria-hidden="true" id='addexp'></i> </div>
        <div className="head">
          <span>Expense Voucher List</span>
          <span>
            Record :  <select name="" id="" value={postperpage} onChange={requirede}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
          <span><input type="text" onChange={sear} value={serinp} placeholder='Type to search...' /></span>
        </div>
        <div className="table">
          <table cellSpacing="15">
            <thead >
              <tr>
                <th>S.no</th>
                <th>Ledger Name</th>
                <th>Amount</th>
                <th>Narration</th>
                <th>Date</th>
                <th style={{ display: "none" }}>View</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>All  : <input type="checkbox" onClick={allselect} id="allcheck" /></th>
              </tr>
            </thead>
            <tbody id="tablecontent">

              {currentpost.map((val, ind) => {
                let daten = new Date(val.date);
                let vf = daten.getUTCDate();
                if (vf < 10) {
                  vf = "0" + daten.getUTCDate();
                }
                // console.log(vf);
                let fde = vf + " " + daten.toLocaleString('default', { month: 'short' }) + ", " + daten.getFullYear().toString().substr(-2);
                return (
                  <tr key={ind}>
                    <td>{firstpostindex + ind + 1}</td>
                    <td>{val.ledger}</td>
                    <td>{val.amount}</td>
                    <td>{val.narration}</td>
                    <td>{fde}</td>
                    <td style={{ display: "none" }} title='view'><i className="fa fa-eye" aria-hidden="true"></i></td>
                    <td title='edit'><i onClick={() => edit(val._id)} className="fa fa-pencil" aria-hidden="true"></i></td>
                    <td title='delete' ><i onClick={() => delet(val._id)} className="fa fa-trash-o" aria-hidden="true"></i></td>
                    <td><input type="checkbox" onClick={highlight} id={val._id} /></td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr id="foot">
                <th colSpan="1" ></th>
                <th colSpan="1" >Total</th>
                <th colSpan="1" id="totalhere">
                  {
                    currentpost.reduce((accu, val, ind) => {
                      return accu = accu + val.amount;
                    }, 0)
                  }

                </th>
                <th colSpan="4" ></th>
                <th colSpan="1" id="alldelete" title="Delete"><i onClick={senddelete} className="fa fa-trash" aria-hidden="true"></i></th>

              </tr>
            </tfoot>
          </table>
        </div>
        <div className="foot">
          <span>Showing Result From {firstpostindex + 1} To {lastpostindex >= expdata.length ? lastpostindex = expdata.length : lastpostindex} of  {expdata.length} Results</span>
          <span>Pages :
            <Pagination currentpage={currentpage} changepageno={changepageno} totalpost={expdata.length} postperpage={postperpage} />
          </span>
        </div>
        <Modalbox notification={notification} setisledupdate={setisledupdate} leddetail={leddetail} fetching={fetching} init={init} setinp={setinp} setisupdate={setisupdate} setmodal={setmodal} sub={sub} modal={modal} handler={handler} inp={inp} isupdate={isupdate} />
        <Ledpage notification={notification} setmodal={setmodal} setisledupdate={setisledupdate} fetching={fetching} isledupdate={isledupdate} setleddetail={setleddetail} leddetail={leddetail} />
      </div>

    </>
  )
}

export default Addexp;
