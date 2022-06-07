import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../../components/layout';
import ArticleChild from '../../components/articleChild';
import MainChild from '../../components/mainArticle';
import { client } from '../../lib/client';
import {IArticle} from '../../interface/article'
import {Box,Heading,Text,Grid,GridItem,Container} from '@chakra-ui/react'

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
    <Layout title="Home" description="text>>>">
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="記事未定。React記事で統一をするのも悪くないかも。" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Heading textAlign={"center"} mt={"5"} mr={"3"}>
          <Image 
          src="/images/yakan_logo.png" 
          width={500}
          height={60} />
        </Heading>
        <Box w={"100%"}>
          {/* メイン記事 */}
            <MainChild 
             title={mainArticle.title} 
             description={mainArticle.description}
             blogTag={mainArticle.Tags} 
             imageSrc = {mainArticle.eyecatch.url} />
              {/* その他記事 */}
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {
              articles.map((article,i)=>(
                i==0?<></>
                :<GridItem w='100%' h='10'>
                  <ArticleChild 
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
