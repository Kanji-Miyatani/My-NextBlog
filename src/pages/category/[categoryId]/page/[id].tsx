import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react'
import { GetAllCategories, GetCategoryName, getPostsCountInCategories, getPostsInCategories } from '../../../../../lib/posts';
import { createTheme } from '@mui/material/styles';
import { ICategories, IMicroCMSBlogRes } from '../../../../../interface/article';
import Layout from '../../../../../components/layout';
import { Box,Heading} from '@chakra-ui/react';
import BlogList from '../../../../../components/blogList';
import Seo from "../../../../../components/Seo";

const MAX_PAGE =2 as const;
type Prop={
  data:IMicroCMSBlogRes,
  page:number,
  categoryName:string
}

export const theme = createTheme({
palette: {
  primary: {
    main: '#ff8e88',
  },
},
});
const CategoryPage:NextPage<Prop> =({categoryName,data,page})=>{
  return(
      <>
       <Layout>
        <Seo title={`カテゴリ:${categoryName}`} isHome={true} imageUrl={""} description={`やかんブログの${categoryName}の記事一覧です。`} />
        <Box textAlign="center">
          <Heading padding={3}>カテゴリ：{categoryName}</Heading>
        </Box>
         <BlogList datas={data} page={page} />
       </Layout>
      </>
  )
}
export const getStaticPaths:GetStaticPaths =async () =>{
  const categories =await GetAllCategories();
  const pathsNotFlat = await Promise.all(
    categories.map((item:ICategories) => {
      const result = getPostsCountInCategories(item.id)
        .then((totalCount) => {
          const range = (start: number, end: number) =>
            [...Array(end - start + 1)].map((_, i) => start + i)

          return range(1, Math.ceil(totalCount / MAX_PAGE)).map(
            (repo) => `/category/${item.id}/page/${repo}`
          )
        })
      return result
    })
  )
  const paths=pathsNotFlat.flat();

  console.log(paths);
  return { paths, fallback: false }
}

export const getStaticProps:GetStaticProps=async({params})=>{
   const categoryId = String(params?.categoryId);
   const categoryPage = Number(params?.id);
   const data = await getPostsInCategories(MAX_PAGE,categoryPage-1,categoryId);
   const categoryName = await GetCategoryName(categoryId);
   return {
    props:{
      data,
      categoryPage,
      categoryName
    }
   }
}

export default CategoryPage;