import { IMicroCMSBlogRes } from "../interface/article";
import ReactPaginate from 'react-paginate';
import styles from '../src/styles/Home.module.css'
import {Box,Grid,GridItem} from '@chakra-ui/react'
import React from "react";
import { useRouter } from "next/router";
import ArticleChildBox from "./ArticleChildBox";

type Prop={
    datas:IMicroCMSBlogRes,
    page:number,
    maxCountInPage:number
}

 const BlogList =({datas,page,maxCountInPage}:Prop)=>{
    var totalPagesCount = Math.ceil(datas.totalCount/maxCountInPage);
    const router = useRouter();
    const handlePaginate = (selectedItem: { selected: number }) => {
        let {pathname} = router;
        router.query.page=String(selectedItem.selected+1);
        router.push({
        pathname:pathname,
        query:router.query
    })}
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
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePaginate}
                        pageRangeDisplayed={5}
                        pageCount={totalPagesCount}
                        previousLabel="<"
                        pageClassName='page-item' //各子要素(li要素)のクラス名
                        pageLinkClassName='page-link' //ページネーションのリンクのクラス名
                        activeClassName='active'
                        className="pagination" 
                        containerClassName='pagination' //ページネーションリンクの親要素のクラス名
                         // 戻る・進む関連
                        previousClassName="page-item" // li
                        nextClassName="page-item" // li
                        previousLinkClassName="previous-link"
                        nextLinkClassName="next-link"
                    
                        // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
                        disabledClassName="disabled-button d-none"
                    
                        // 中間ページの省略表記関連
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                    />
                </Box>
            </div>
        </>
    )
}

export default BlogList;