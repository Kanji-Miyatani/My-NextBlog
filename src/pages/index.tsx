import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../../components/layout';
import ArticleChild from '../../components/articleChild';
import MainChild from '../../components/mainArticle';
import { client } from '../../lib/client';
import {IArticle} from '../../interface/article';
import NextImage from 'next/image'
import {Box,Heading,Text,Grid,GridItem,} from '@chakra-ui/react'

type Props ={
  articles : Array<IArticle>
}

export async function getStaticProps(){
    const data = await client.get({endpoint:"blogs"});
    return{
      props:{
        articles:data.contents
      }
    }
}

const Home: NextPage<Props> = ({articles}:Props) => {
  //最新記事のみメイン記事として表示
  var mainArticle = articles[0];
  return (
    <Layout>
       
      <div className={styles.container}>
       <Box w={"100%"} position="relative" h="400px">
         <NextImage src="/images/wall.jpg" layout='fill' alt="メイン写真" />
       </Box>
        <Box w={"100%"}>
          {/* メイン記事 */}
            <MainChild 
             title={mainArticle.title} 
             description={mainArticle.description}
             blogTag={mainArticle.Tags} 
             imageSrc = {mainArticle.eyecatch.url} />
              {/* その他記事 */}
            <Grid className="container-" templateColumns='repeat(3, 1fr)' gap={6} mt="5" h="100%">
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
      </div>
    </Layout>
  )
}

export default Home
