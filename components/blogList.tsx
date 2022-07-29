import { IMicroCMSBlogRes, IMicroCMSRes } from "../interface/article";
import { getAllPosts, getPostsInPages } from "../lib/posts";
import { Pagination } from '@mui/material';
import Image from 'next/image'
import styles from '../src/styles/Home.module.css'
import {Box,Heading,Text,Grid,GridItem,Container} from '@chakra-ui/react'
import { createTheme } from '@mui/material/styles';
import ArticleChild from "./articleChild";
import React from "react";
import { useRouter } from "next/router";
import ArticleChildBox from "./articleChildBox";

type Prop={
    datas:IMicroCMSBlogRes,
    page:number,
    maxCountInPage:number
}
export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8e88',
    },
  },
});
const BlogList =({datas,page,maxCountInPage}:Prop)=>{
    var totalPagesCount = Math.ceil(datas.totalCount/maxCountInPage);
    const router = useRouter();
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        let {pathname} = router;
        delete router.query.page;
        pathname = pathname.replace(/\[page\]/,`${page}`);
        router.push({
            pathname:pathname,
            query:router.query
        })
    }
    const articles = datas.contents;
    return(
        <>
            <div className={styles.container}>
                <Box w={"100%"}>
                    {/* その他記事 */}
                    <Grid className="container-" templateColumns={{lg:'repeat(3, 1fr)',md:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',base:'repeat(1, 1fr)'}} gap={6} mt="5" h="100%">
                    {articles.length==0?
                    <Box m="1rem">記事がありません。</Box>:
                    articles.map((article,index)=>(
                        <GridItem w='100%' key={index}>
                            <ArticleChildBox
                            id ={article.id}
                            title={article.title} 
                            description={article.description}
                            blogTag={article.Tags} 
                            imageSrc = {article.eyecatch.url}
                            date={new Date(article.publishedAt)}
                            categoryID ={article.category?.id}
                            categoryName={article.category?.name}
                            />
                        </GridItem>
                    ))
                    }
                </Grid>
                </Box>
                <Box mt={4}>
                    <Pagination onChange={handlePageChange} className={styles.pagination} count={totalPagesCount} page={page} siblingCount={3} />
                </Box>
            </div>
        </>
    )
}

export default BlogList;

