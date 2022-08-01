import { GetStaticProps } from "next";
import { IArticle } from "../interface/article";
import {Box,Heading,Text} from '@chakra-ui/react';
import 'highlight.js/styles/vs2015.css';
import { getTocs } from "../lib/dataConvert";
import ContentsTable from "./contentsTable";
import {ToDateString} from "../lib/dateService";
import NextImage from "next/image"
type Props={
    article:IArticle
}

const BlogDetail=({article}:Props)=>{
    //目次の作成
    const title = article.title;
    const date =new Date(article.createdAt);
    const html = article.content;
    const tocs = getTocs(article);
    return(
        <Box bgColor={"white"} minW={"98%"} shadow="sm" px={{sm:"2rem",base:"2px"}} py="2rem">
            <Box pb={"20px"} mx="5px" >
              <Heading as="h1" my={3}>{title}</Heading>
              <Text>作成日：{ToDateString(date)}</Text>
              <Box pb={"20px"} px={{md:"1rem",base:"0"}} mx="1rem">
                <NextImage src={article.eyecatch.url} height={article.eyecatch.height} width={article.eyecatch.width} objectFit="cover" ></NextImage>
              </Box>
            </Box>
            <Box pb={"20px"} mx={{base:"4px",md:"0"}}  >
                <ContentsTable tocs={tocs}/>
            </Box>
            <Box mt={"20px"} mx={{base:"10px",md:"0"}}>
                <div className="blog-container" dangerouslySetInnerHTML={{__html:html}}/>
            </Box>
        </Box>
    )

}
export default BlogDetail;

