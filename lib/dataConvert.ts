

import { IBreadCrumbData } from '../interface/domestic';

export const getDomain=():string=>{
  return "https://yakanblog.com"
}

export const CreateBreadCrumbdata=(nowPage:string="",nowPagePath:string="",parentPage:string="",parentPagePath:string="") : IBreadCrumbData=>{
  return{
    nowPage:nowPage,
    nowPagePath:nowPagePath,
    parentPage:parentPage,
    parentPagePath:parentPagePath
  }
} 