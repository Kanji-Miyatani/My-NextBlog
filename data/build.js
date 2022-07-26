const fs = require('fs');
const client= require('microcms-js-sdk');

const client = createClient({
   serviceDomain: 'yakankun',
   apiKey: process.env.API_KEY || '',
 });

 async function getCategoryCount(){
   const data = await client.get({
                               endpoint: 'blogs',
                               queries: {fields: 'id,name,category'}
                             });
   //カテゴリでGroupBy的な処理
   return data.contents.reduce((result,content)=>{
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
 
const SaveMicroCMSJson=async()=>{
   const data=await getCategoryCount();
   const json =JSON.stringify(data);
   console.log("JsonCreated");
   console.log(json, null, 2);
   fs.writeFileSync("./microCmsData.json",json);
}

SaveMicroCMSJson();