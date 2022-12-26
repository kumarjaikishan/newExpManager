import React, { useState } from 'react'
import { useEffect } from 'react';
import './addexp.css';
import swal from 'sweetalert'
import Pagination from './pagination';
import Modalbox from './modalbox';
import Ledpage from './ledpage';
import { useNavigate } from "react-router-dom";

const Addexp = ({login,setloader,leddetail,setleddetail}) => {
  let navigate = useNavigate();
  useEffect(() => {
    if(!login){
      navigate('/login');
      return;
    }
    fetching();
    setloader(true)
  }, [])
  const date = new Date;
  
  const [isupdate, setisupdate] = useState(false);
  const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getUTCDate();

  const init = {
    userid:"",
    ledger: "general",
    date: today,
    amount: "",
    narration: ""
  }
  const [isledupdate,setisledupdate]= useState(false);
  const [inp, setinp] = useState(init);
  const [expdata, setexpdata] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(5);

 

  // for LOading data
  const fetching = async () => {
    const userid = localStorage.getItem("id");
    if(!userid){
      console.log("user id not found");
    }else{
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
      setexpdata(datae.data)
      setloader(false);
      // console.log(datae.data);
    }
   
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
    const userid = localStorage.getItem("id");
    if (!userid || !ledger || !date || !amount || !narration) {
      // return alert("kindly fill all data");
      return swal({
        title: "Wait!",
        text: "Kindly fill all Fields!",
        icon: "warning",
      });
    }else{
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
      setmodal(false);
      setinp(init);
      // console.log(data.msg);
    }
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

          swal("Data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!");
        }
      });
  }
  // for deleteing data ends here

  const requirede = (e) => {
    setpostperpage(e.target.value);
    setcurrentpage(1);
  }

  const changepageno = (hi) => {
    setcurrentpage(hi);
  }

  let lastpostindex = currentpage * postperpage;
  const firstpostindex = lastpostindex - postperpage;

  const currentpost = expdata.slice(firstpostindex, lastpostindex);
  let sum = 0;
  return (
    <>
      <div className="exp">
        <div className="add"> <i title='Add Expense' class="fa fa-plus" onClick={() => setmodal(true)} aria-hidden="true" id='addexp'></i> </div>
        <div className="head">
          <span>Expense Voucher List</span>
          <span>
            Record :  <select name="" id="" value={postperpage} onChange={requirede}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
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
              <th>View</th>
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
                    <td title='view'><i class="fa fa-eye" aria-hidden="true"></i></td>
                    <td title='edit'><i onClick={() => edit(val._id)} class="fa fa-pencil" aria-hidden="true"></i></td>
                    <td title='delete' ><i onClick={() => delet(val._id)} class="fa fa-trash-o" aria-hidden="true"></i></td>
                    <td><input type="checkbox" name="" id="" /></td>
                  </tr>
                )
              })}
            </tbody>
            <tr id="foot">
              <th colSpan="1" ></th>
              <th colSpan="1" >Total</th>
              <th colSpan="1" id="totalhere">
                {
                  currentpost.map((val, ind) => {
                    sum = sum + val.amount;
                    return;
                  })
                }
                {sum}
              </th>
              <th colSpan="5" ></th>
              <th colSpan="1" id="alldelete" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></th>

            </tr>
          </table>
        </div>
        <div className="foot">
          <span>showing result from {firstpostindex + 1} to {lastpostindex >=expdata.length ? lastpostindex=expdata.length: lastpostindex} of  {expdata.length} Results</span>
          <span>Pages :
            <Pagination currentpage={currentpage} changepageno={changepageno} totalpost={expdata.length} postperpage={postperpage} />
          </span>
        </div>
        <Modalbox setisledupdate={setisledupdate} leddetail={leddetail} fetching={fetching} init={init} setinp={setinp} setisupdate={setisupdate} setmodal={setmodal} sub={sub} modal={modal} handler={handler} inp={inp} isupdate={isupdate} />
        <Ledpage setmodal={setmodal} setisledupdate={setisledupdate} isledupdate={isledupdate} setleddetail={setleddetail} leddetail={leddetail} />
      </div>

    </>
  )
}

export default Addexp;
