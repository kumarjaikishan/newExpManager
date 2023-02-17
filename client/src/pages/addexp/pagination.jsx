import React, { useState } from 'react'

const Pagination = ({ totalpost, postperpage, changepageno, currentpage }) => {
  let pages = [];
  const [pagenumberlimit, setpagenumberlimit] = useState(5);
  const [maxpagenumberlimit, setmaxpagenumberlimit] = useState(5);
  const [minpagenumberlimit, setminpagenumberlimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalpost / postperpage); i++) {
    pages.push(i);
  }

  const renderpagination = pages.map((val, ind) => {
    if (val < maxpagenumberlimit + 1 && val > minpagenumberlimit) {
      return (
        <span key={ind} onClick={() => changepageno(val)} className={currentpage == val ? "pages active" : "pages"}>{val}</span>
      )
    }
  })

  const plus = () => {

    setmaxpagenumberlimit(maxpagenumberlimit+pagenumberlimit)
    setminpagenumberlimit(minpagenumberlimit+pagenumberlimit)
    if(maxpagenumberlimit >= pages.length-1){
      setmaxpagenumberlimit(pages.length);
      setminpagenumberlimit(pages.length-pagenumberlimit)
    }
  }
  const minus = () => {
    // console.log("min:"+minpagenumberlimit)
    // console.log("max:"+maxpagenumberlimit)
    // console.log(pages.length)
   
    setmaxpagenumberlimit(maxpagenumberlimit-pagenumberlimit)
    setminpagenumberlimit(minpagenumberlimit-pagenumberlimit)
    if(minpagenumberlimit <= 1){
      setmaxpagenumberlimit(pagenumberlimit);
      setminpagenumberlimit(0)
    }
  }
  // console.log(currentpage);
  return (
    <>
      <span><i title='Previous 5 Pages' onClick={minus} className="fa fa-angle-double-left" aria-hidden="true"></i></span>
      {
        renderpagination
      }
      <span><i title='Next 5 Pages' onClick={plus} className="fa fa-angle-double-right" aria-hidden="true"></i></span>
    </>
  )
}

export default Pagination;