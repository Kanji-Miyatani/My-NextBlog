import {client} from  "./client";
import {IArticle, IMicroCMSRes, IPaths} from "../interface/article"

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
    return data.contents[0];
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