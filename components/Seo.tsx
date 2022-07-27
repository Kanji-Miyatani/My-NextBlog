import Head from "next/head";
import { getDomain } from "../lib/dataConvert";
type Props = {
    title?:string
    description?:string,
    imageUrl : string,
    path:string,
    isHome:boolean
}
export default function Seo({title,description,imageUrl,isHome=false,path}:Props){
    const pageTitle = `${title}:やかんBlog`
    const url = getDomain();
    return(
    <Head>
    <title>{pageTitle}</title>
     <meta charSet="utf-8"></meta>
     <meta name="description" content={description} />
     <meta property="og:title" content={pageTitle}/>
     <meta property="og:description" content={description}/>
     <meta property="og:type" content={isHome?'website':'article'}/>
     <meta property="og:site_name" content="やかんブログ" />
     <meta property="og:image" content={imageUrl}/>
     <meta property="og:url" content={url}/>
     <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
</Head>
)}