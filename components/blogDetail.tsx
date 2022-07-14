import { GetStaticProps } from "next";
import { IArticle } from "../interface/article";
import {Box,Heading,Text} from '@chakra-ui/react';


type Props={
    article:IArticle
}


import 'highlight.js/styles/github.css';
const BlogDetail=({article}:Props)=>{
    //目次の作成
    const title = article.title;
    const date =new Date(article.createdAt);
    const html = article.content;

    return(
        <Box bgColor={"white"} minW={"100%"} shadow="sm" px="3rem" py="2rem">
            <Box pb={"20px"} >
              <Heading as="h1" my={3}>{title}</Heading>
              <Text>作成日：{date.toDateString()}</Text>
            </Box>
            <Box mt={"20px"}>
                <div className="blog-container" dangerouslySetInnerHTML={{__html:html}}/>
            </Box>
        </Box>
    )

}
export default BlogDetail;

