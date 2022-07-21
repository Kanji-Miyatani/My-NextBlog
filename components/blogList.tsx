import { IMicroCMSBlogRes, IMicroCMSRes } from "../interface/article";
import { getAllPosts, getPostsInPages } from "../lib/posts";
import { Pagination } from '@mui/material';
import Image from 'next/image'
import styles from '../src/styles/Home.module.css'
import {Box,Heading,Text,Grid,GridItem,Container} from '@chakra-ui/react'
import { createTheme } from '@mui/material/styles';
import ArticleChild from "./articleChild";

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
const BlogList =({datas,page}:Prop)=>{
    var totalPagesCount = Math.ceil(datas.totalCount/MAX_PAGE);
    const articles = datas.contents;
    return(
        <>
            <div className={styles.container}>
                <Box w={"100%"}>
                    {/* その他記事 */}
                    <Grid className="container-" templateColumns='repeat(1, 1fr)' gap={6} mt="5" h="100%">
                    {
                    articles.map((article,index)=>(
                        <GridItem w='100%' key={index}>
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
                <Box mt={4}>
                    <Pagination className={styles.pagination} count={totalPagesCount} defaultPage={page} siblingCount={3} />
                </Box>
            </div>
        </>
    )
}

export default BlogList;

