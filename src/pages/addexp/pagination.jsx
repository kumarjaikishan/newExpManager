import React from 'react'

const Pagination = ({totalpost,postperpage,changepageno,currentpage}) => {
    let pages =[];
    for (let i = 1; i <= Math.ceil(totalpost/postperpage) ; i++) {
       pages.push(i);
    }
    console.log(currentpage);
  return (
   <>
   {
    pages.map((val,ind)=>  <span    key={ind} onClick={()=>changepageno(val)}  className={currentpage==val ? "pages active":"pages"}>{val}</span>)
   }
 
   </>
  )
}

export default Pagination;