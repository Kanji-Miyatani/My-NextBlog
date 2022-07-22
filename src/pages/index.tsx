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
import Seo from '../../components/Seo';

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
  var displayArticles = articles.slice(0,10);
  return (
    <Layout>
      <Seo title='ホーム' isHome={true} imageUrl={""} description="やかんのブログ｜トップページ" />
      <div className={styles.container}>
       <Box w={"100%"} position="relative" h="30vh">
         <NextImage src="/images/YakanHome.png" layout='fill' objectFit='cover' alt="メイン写真" />
       </Box>
        <Box w={"100%"}>
            {/* その他記事 */}
            <Grid className="container-" templateColumns='repeat(1, 1fr)' gap={6} mt="5" h="100%">
            {
              displayArticles.map((article,index)=>(
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
      </div>
    </Layout>
  )
}

export default Home
