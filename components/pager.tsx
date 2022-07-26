import React from 'react'
type PegesProp={
    CurrentPage:number
    TotalBlogsCount:number
}
 const pager=({CurrentPage,TotalBlogsCount}:PegesProp)=> {
    const MAX = 10;
    const pagesArray = new Array(Math.ceil(TotalBlogsCount/MAX)).map((i,_)=>{
        return i;
    })
    return (
        <div>pager</div>
    )
}

export default pager