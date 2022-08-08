import {client} from  "./client";
import {IArticle, ICategories, ICategoryCount, IMicroCMSBlogRes, IMicroCMSCategoriesRes, IMicroCMSRes, IPaths,ITags,ITocs} from "../interface/article"
import * as cheerio from 'cheerio';
import hljs from 'highlight.js';

export async function getAllPosts():Promise<Array<IArticle>>{
    const data =await client.get({
                            endpoint: 'blogs',
                            });
                            console.log(data);
                            
    return data.contents;
}

export async function getCategoryCount():Promise<Array<ICategoryCount>>{
  const data:IMicroCMSBlogRes = await client.get({
                              endpoint: 'blogs',
                              queries: {fields: 'id,name,category'}
                            });
  //カテゴリでGroupBy的な処理
  return data.contents.reduce((result:ICategoryCount[],content:IArticle)=>{
      const elem =result.find(x=>x.id=content.id);
      if(elem){
          elem.count++;
      }else{
        result.push({
          name:content.category.name,
          id:content.category.id,
          count:1
        })
      }
      return result;
  },[])
}

export async function getPostsInPages(count:number,offset:number):Promise<IMicroCMSBlogRes>{
    const data:IMicroCMSBlogRes =await client.get({
                            endpoint: 'blogs',
                            queries: {limit: count, offset: offset}
                            });
    return data;
}

export async function getPostsInCategories(count:number,offset:number,id:string):Promise<IMicroCMSBlogRes>{
  const data:IMicroCMSBlogRes =await client.get({
                                                        endpoint: 'blogs',
                                                        queries: {filters: `category[equals]${id}`, limit: count, offset: offset}
                                                        });
  return data;
}
export async function getPostsCountInCategories(id:string):Promise<number>{
  const data:IMicroCMSCategoriesRes =await client.get({
                                                        endpoint: 'blogs',
                                                        queries: {filters: `category[equals]${id}`,fields: "totalcount"}
                                                        });
  return data.totalCount;
}

export async function getPost(id:string):Promise<IArticle>{
    const data :IMicroCMSBlogRes= await client.get({
                                    endpoint: 'blogs',
                                    queries: {filters: `id[equals]${id}`}
                                 });
    const $ = cheerio.load(data.contents[0].content || "")
    $("pre code").each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text())
      $(elm).html(result.value)
      $(elm).addClass("hljs")
    })
    data.contents[0].content  = $.html();
    return data.contents[0];
}
//全カテゴリ取得
export async function GetAllCategories():Promise<ICategories[]>{
    const data :IMicroCMSCategoriesRes=await client.get({endpoint:"categories"});
    return data.contents;
}
//IDからカテゴリ名取得
export async function GetCategoryName(id:string):Promise<string>{
  const data :IMicroCMSCategoriesRes=await client.get({endpoint:"categories",
                                                        queries:{filters:`id[equals]${id}`,fields:'name'}
                                                      });
  return data.contents[0].name;
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

//全てのブログ検索取得
export async function getSearchedPosts(sWord:string,offset:number,count:number):Promise<IMicroCMSBlogRes>{
  const data = await client
  .get({
    endpoint: 'blogs',
    queries: {
      limit: count, offset: offset,
      filters:`title[contains]${sWord}[or]description[contains]${sWord}`,
  },
  });

  return data;
}

