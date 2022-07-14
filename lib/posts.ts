import {client} from  "./client";
import {IArticle, IMicroCMSRes, IPaths} from "../interface/article"
import * as cheerio from 'cheerio';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

export async function getAllPosts():Promise<Array<IArticle>>{
    const data =await client.get({
                            endpoint: 'blogs',
                            });
                            console.log(data);
    return data.contents;
}

export async function getPostsInPages(count:number,offset:number):Promise<Array<IMicroCMSRes>>{
    const data =await client.get({
                            endpoint: 'blogs',
                            queries: {limit: count, offset: offset}
                            });
                            console.log(data);
    return data;
}

export async function getPost(id:string):Promise<IArticle>{
    const data = await client.get({
                                    endpoint: 'blogs',
                                    queries: {filters: `id[equals]${id}`}
                                 });
    const $ = cheerio.load(data.content || "")
    $("pre code").each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text())
      $(elm).html(result.value)
      $(elm).addClass("hljs")
    })
    data.content = $.html();
    return data;
}
//全てのブログID取得
export async function getAllPostIds():Promise<Array<IPaths>>{
    const data = await client
    .get({
      endpoint: 'blogs',
      queries: {fields: 'id'}
    });
    return data.contents;
}