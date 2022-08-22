import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import React from 'react'
import { GetAllCategories, GetCategoryName, getPostsCountInCategories, getPostsInCategories } from '../../../../../lib/posts';
import { ICategories, IMicroCMSBlogRes } from '../../../../../interface/article';
import Layout from '../../../../../components/layout';
import { Box,Heading} from '@chakra-ui/react';
import BlogList from '../../../../../components/blogList';
import Seo from "../../../../../components/Seo";
import { CreateBreadCrumbdata } from '../../../../../lib/dataConvert';

const MAX_PAGE =12 as const;
type Prop={
  data:IMicroCMSBlogRes,
  page:number,
  categoryName:string,
  categoryId:string
}

const CategoryPage:NextPage<Prop> =({categoryName,data,page,categoryId})=>{
  return(
      <>
       <Layout breadCrumbData={CreateBreadCrumbdata(categoryName,`/category/${categoryId}/page/1`,)}>
        <Seo title={`カテゴリ:${categoryName}`} isHome={true} imageUrl={""} description={`やかんブログの${categoryName}の記事一覧です。`} path={`category/${categoryId}/page/1`} />
        <Box textAlign="center">
          <Heading padding={3}>カテゴリ：{categoryName}</Heading>
        </Box>
         <BlogList datas={data} page={page} maxCountInPage={MAX_PAGE} />
       </Layout>
      </>
  )
}
export const getStaticPaths:GetStaticPaths =async () =>{
  const categories =await GetAllCategories();
  const pathsNotFlat = await Promise.all(
    categories.map((item:ICategories) => {
      return  getPostsCountInCategories(item.id)
        .then((totalCount) => {
          const range = (start: number, end: number) =>
            [...Array(end - start + 1)].map((_, i) => start + i)
          let pagesEnd =  Math.ceil(totalCount / MAX_PAGE);
          pagesEnd = pagesEnd==0?1:pagesEnd;//記事数0でも表示
          return range(1, pagesEnd).map(
            (repo) => `/category/${item.id}/page/${repo}`
          )
        })
    })
  )
  const paths=pathsNotFlat.flat();

  console.log(paths);
  return { paths, fallback: false }
}

export const getStaticProps:GetStaticProps=async({params}:GetStaticPropsContext)=>{
   const categoryId = String(params?.categoryId);
   const categoryPage = Number(params?.page);
   const data = await getPostsInCategories(MAX_PAGE,categoryPage-1,categoryId);
   const categoryName = await GetCategoryName(categoryId);
   return {
    props:{
      data,
      categoryPage,
      categoryName,
      categoryId
    }
   }
}

export default CategoryPage;