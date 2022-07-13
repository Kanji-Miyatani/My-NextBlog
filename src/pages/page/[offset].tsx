import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IMicroCMSRes } from "../../../interface/article";
import { getAllPosts, getPostsInPages } from "../../../lib/posts";
import { Pagination } from '@mui/material';
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Layout from '../../../components/layout';
import ArticleChild from '../../../components/articleChild';
import {Box,Heading,Text,Grid,GridItem,Container} from '@chakra-ui/react'
const MAX_PAGE = 10 as const;
type Prop={
    datas:IMicroCMSRes,
    page:number
}
import { createTheme } from '@mui/material/styles';

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
            <div className={styles.container}>
                <Box w={"100%"}>
                    {/* その他記事 */}
                    <Grid className="container-" templateColumns='repeat(1, 1fr)' gap={6} mt="5" h="100%">
                    {
                    articles.map((article,index)=>(
                        index==0?<></>
                        :<GridItem w='100%' key={index}>
                        <ArticleChild
                        id ={article.id}
                        title={article.title} 
                        description={article.description}
                        blogTag={article.Tags} 
                        imageSrc = {article.eyecatch.url}
                        date={new Date(article.updatedAt)}
                        />
                        </GridItem>
                    ))
                    }
                </Grid>
                </Box>
                <Pagination className={styles.pagination} count={totalPagesCount} defaultPage={page} siblingCount={3} />
            </div>
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