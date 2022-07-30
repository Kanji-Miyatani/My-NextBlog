import { Box, Heading } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import BlogList from '../../../components/blogList'
import Layout from '../../../components/layout'
import Seo from '../../../components/Seo'
import {  IMicroCMSBlogRes } from '../../../interface/article'
import { CreateBreadCrumbdata } from '../../../lib/dataConvert'
import { getSearchedPosts } from '../../../lib/posts'
const MAX_PAGE =15 as const;
type Props={
    datas:IMicroCMSBlogRes
    page:number
    sWord:string
}
const SearchPage:NextPage<Props>=({datas,page,sWord})=> {
    return(
        <>
         <Layout breadCrumbData={CreateBreadCrumbdata("ブログ一覧",`/page/${page}`,)}>
            <Seo title='ブログ一覧:検索' isHome={true} imageUrl={""} description={`やかんブログの検索ワード：${sWord}の検索結果記事一覧です。`} path="page/1" />
            <Box textAlign="center">
              <Heading padding={3}>検索条件：{sWord}</Heading>
            </Box>
            <BlogList datas={datas} page={page} maxCountInPage={MAX_PAGE} />
         </Layout>
        </>
    )
}

export default SearchPage;

 export const getServerSideProps:GetServerSideProps<Props>=async(context)=>{
    const sWord:string = String(context.query.search);
    const page = Number(context.params?.page ?? 1);
    const datas = await getSearchedPosts(sWord,Math.ceil(page - 1)*MAX_PAGE,MAX_PAGE);
    
    return {
      props:{
        datas,
        page,
        sWord
      }
    }
 }