import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IMicroCMSBlogRes, IMicroCMSRes } from "../../../interface/article";
import { getAllPosts, getPostsInPages } from "../../../lib/posts";
import { Pagination } from '@mui/material';
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Layout from '../../../components/layout';
import ArticleChild from '../../../components/articleChild';
import { createTheme } from '@mui/material/styles';
import Seo from "../../../components/Seo";
import {Box,Heading,Text,Grid,GridItem,Container} from '@chakra-ui/react'
import BlogList from "../../../components/blogList";
const MAX_PAGE =2 as const;
type Prop={
    datas:IMicroCMSBlogRes,
    page:number
}


export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8e88',
    },
  },
});
const DynamicPage:NextPage<Prop> =({datas,page})=>{
    var totalPagesCount = Math.ceil(datas.totalCount/MAX_PAGE);
    const articles = datas.contents;
    return(
        <>
         <Layout>
            <Seo title='ブログ一覧' isHome={true} imageUrl={""} description="やかんブログの記事一覧です。" path="page/1" />
            <BlogList  datas={datas} page={page}  />
         </Layout>
        </>
    )
}

export const getStaticPaths:GetStaticPaths =async () => {
    const blogsCount = (await getAllPosts()).length;
    const paths = [...Array(Math.ceil(blogsCount/MAX_PAGE))].map((_,i)=>{
        return {
            params:{
                offset:`${i+1}`
            }
        }
    })
    return {paths,fallback:false }
}

export const getStaticProps:GetStaticProps = async({params})=>{
    const offset = params?.offset ? String(params?.offset) : '0';
    const datas =await getPostsInPages(MAX_PAGE,Math.ceil(Number.parseInt(offset, 10) - 1)*MAX_PAGE);
    const page = offset;
    return {
        props:{
            datas,
            page
        }
    }
}
export default DynamicPage;