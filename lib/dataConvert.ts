
import * as cheerio from 'cheerio';
import { getDomainLocale } from 'next/dist/shared/lib/router/router';
import { IArticle, ITocs } from '../interface/article';
import { IBreadCrumbData } from '../interface/domestic';

export function getTocs(article:IArticle):ITocs[]{
    const $ =  cheerio.load(article.content || "");
    const headings = $('h1, h2').toArray();
     const toc :ITocs[]= headings.map((elem) => ({
       text: (elem.children[0] as any).data,
       id: elem.attribs.id,
       name :elem.name
     }));
   
    return toc;
}

export const getDomain=():string=>{
  return "https://my-next-blog-orpin.vercel.app"
}

export const CreateBreadCrumbdata=(nowPage:string="",nowPagePath:string="",parentPage:string="",parentPagePath:string="") : IBreadCrumbData=>{
  return{
    nowPage:nowPage,
    nowPagePath:nowPagePath,
    parentPage:parentPage,
    parentPagePath:parentPagePath
  }
}