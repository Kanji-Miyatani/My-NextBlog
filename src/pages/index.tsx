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
import {Box,Heading,Text,Grid,GridItem, Button, Flex, List, ListItem,} from '@chakra-ui/react'
import {GrNext} from 'react-icons/gr'
import Seo from '../../components/Seo';
import HomeEyeCatch from '../../components/homeEyeCatch';
import { CreateBreadCrumbdata } from '../../lib/dataConvert';
import ArticleChild from '../../components/articleChild';

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
  var displayArticles = articles.slice(0,5);
  return (
    <Layout breadCrumbData={CreateBreadCrumbdata()}>
      <Seo title='ホーム' isHome={true} imageUrl={""} description="やかんのブログ｜トップページ" path="" />
      <div className={styles.container}>
       <Box w={"100%"} position="relative" minH="290px">
        <HomeEyeCatch/>
       </Box>
        <Box w={"100%"} mt={5}>
          <Heading as="h4" fontSize={20} borderBottom="2px double gray" mx="auto" mb="3" textAlign="center">
            最新記事一覧
          </Heading>
            {/* その他記事 */}
            <Grid className="container-" templateColumns={{md:'repeat(3, 1fr)',sm:'repeat(2, 1fr)',base:'repeat(1, 1fr)'}} gap={6} mt="1" h="100%">
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
          <Box textAlign="center" mt="1rem">
            <NextLink href="/page/1">
              <a>
              <Button>もっと見る
                <Box m={1}><GrNext color="gray" /></Box>
              </Button>
              </a>
            </NextLink>
          </Box>
        </Box>
        <Box w={"100%"} mt={5}>
          <Heading as="h4" fontSize={20} borderBottom="2px double gray" mx="auto" mb="3" textAlign="center">
            カテゴリ別おすすめ記事
          </Heading>
            <Flex flexDirection={{md:"row",base:"column"}}>
              <Box mr="2">
                <Heading my="0.5rem" pb="5px" fontSize="2rem" w="5rem">日記</Heading>
                <List>
                  {
                    displayArticles.map((article,index)=>(
                    <ListItem w='100%' key={index}>
                        <ArticleChild
                        id ={article.id}
                        title={article.title} 
                        description={article.description}
                        blogTag={article.Tags} 
                        imageSrc = {article.eyecatch.url}
                        date={new Date(article.publishedAt)}
                        />
                        </ListItem>
                    ))
                  }
                </List>
              </Box>
              <Box mr="2">
                <Heading my="0.5rem" fontSize="2rem" >Web開発</Heading>
                <List>
                  {
                    displayArticles.map((article,index)=>(
                    <ListItem pb="5px" w='100%' key={index}>
                        <ArticleChild
                        id ={article.id}
                        title={article.title} 
                        description={article.description}
                        blogTag={article.Tags} 
                        imageSrc = {article.eyecatch.url}
                        date={new Date(article.publishedAt)}
                        />
                        </ListItem>
                    ))
                  }
                </List>
              </Box>
            </Flex>
          <Box textAlign="center" mt="1rem">
            <NextLink href="/page/1">
              <a>
              <Button>もっと見る
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
