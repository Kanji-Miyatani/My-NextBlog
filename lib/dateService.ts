export const ToDateString=(date:Date):string=>{
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    return `${year}年${month}月${day}日`
}
