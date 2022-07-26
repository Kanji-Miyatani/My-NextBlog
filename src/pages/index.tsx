import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../../components/layout';
import ArticleChildBox from '../../components/articleChildBox';
import MainChild from '../../components/mainArticle';
import { client } from '../../lib/client';
import {IArticle} from '../../interface/article';
import NextImage from 'next/image';
import NextLink from 'next/link';
import {Box,Heading,Text,Grid,GridItem, Button,} from '@chakra-ui/react'
import {GrNext} from 'react-icons/gr'
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
        <Box w={"100%"} mt={5}>
          <Heading as="h4" fontSize={20} borderBottom="2px double gray" mx="auto" mb="3" textAlign="center">
            最新記事一覧
          </Heading>
            {/* その他記事 */}
            <Grid className="container-" templateColumns={{sm:'repeat(3, 1fr)',base:'repeat(1, 1fr)'}} gap={6} mt="1" h="100%">
            {
              displayArticles.map((article,index)=>(
              <GridItem w='100%' key={index}>
                  <ArticleChildBox
                  id ={article.id}
                  title={article.title} 
                  description={article.description}
                  blogTag={article.Tags} 
                  imageSrc = {article.eyecatch.url}
                  date={new Date(article.publishedAt)}
                  categoryName={article.category?.name}
                  categoryID={article.category?.id}
                  />
                  </GridItem>
              ))
            }
          </Grid>
          <Box textAlign="center" mt="2rem">
            <NextLink href="/page/1">
              <a>
              <Button>ブログ一覧
                <Box m={1}><GrNext color="gray" /></Box>
              </Button>
              </a>
            </NextLink>
          </Box>
        </Box>
      </div>
    </Layout>
  )
}

export default Home
