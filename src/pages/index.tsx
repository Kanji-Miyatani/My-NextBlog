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
import {Box,Heading,Text,Grid,GridItem, Button, Flex, List, ListItem, Tabs, TabList, Tab, TabPanels, TabPanel,} from '@chakra-ui/react'
import {GrNext} from 'react-icons/gr'
import Seo from '../../components/Seo';
import HomeEyeCatch from '../../components/homeEyeCatch';
import { CreateBreadCrumbdata } from '../../lib/dataConvert';
import ArticleChild from '../../components/articleChild';
import { GetCategoryName } from '../../lib/posts';

type Props ={
  articles : Array<IArticle>
}
//カテゴリごとの記事一覧
interface IArticlesByCategory{
  categoryName:string
  categoryId : string
  articles:IArticle[]
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
  //最新記事の取得
  const displayArticles = articles.slice(0,5);
  const categoryArticles = articles.reduce((result:IArticlesByCategory[],article)=>{
    const categoryName = article.category?.name;
    const categoryId = article.category?.id;
      if(result.find(x=>x.categoryId==categoryId)){
          result.find(x=>x.categoryId==categoryId)?.articles.push(article);
      }
      else{
        result.push({
          categoryId : categoryId,
          categoryName:categoryName,
          articles:[article]
        })
      }
      return result;
  },[])
  return (
    <Layout breadCrumbData={CreateBreadCrumbdata()}>
      <Seo title='ホーム' isHome={true} imageUrl={""} description="やかんのブログ｜トップページ" path="" />
      <div className={styles.container}>
       <Box w={"100%"} position="relative" minH="auto">
        <HomeEyeCatch/>
       </Box>
        <Box w={"100%"} mt={5}>
          <Heading as="h4" fontSize={20} borderBottom="2px double gray" mx="auto" mb="3" textAlign="center">
            最新記事一覧
          </Heading>
            {/* その他記事 */}
            <Grid className="container-" templateColumns={{lg:'repeat(3, 1fr)',md:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',base:'repeat(1, 1fr)'}} gap={6} mt="1" h="100%">
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
        <Box w={"100%"} mt="3rem">
          <Heading as="h4" fontSize={20} borderBottom="2px double gray" mx="auto" mb="3" textAlign="center">
            カテゴリ別おすすめ記事
          </Heading>
          <Tabs variant='solid-rounded' colorScheme='green'>
            <TabList>
              {
                categoryArticles.map((categoryArticle)=>(
                  <Tab key={categoryArticle.categoryId}>{categoryArticle.categoryName}</Tab>
                ))
              }
            </TabList>
            <TabPanels>
              {
                categoryArticles.map((categoryArticle)=>(
                  <TabPanel key={categoryArticle.categoryId}>
                    <Grid className="container-" templateColumns={{lg:'repeat(3, 1fr)',md:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',base:'repeat(1, 1fr)'}} gap={6} mt="1" h="100%">
                      {
                        categoryArticle.articles.slice(0,6).map((article,index)=>(
                          <GridItem w='100%' key={index}>
                            <ArticleChildBox
                            id ={article.id}
                            title={article.title} 
                            description={article.description}
                            blogTag={article.Tags} 
                            imageSrc = {article.eyecatch.url}
                            date={new Date(article.publishedAt)}
                            categoryID = {article.category?.id}
                            categoryName = {article.category?.name}
                            />
                          </GridItem>
                          ))
                      }
                    </Grid>
                    <Box textAlign="center" mt="1rem">
                      <NextLink href={`category/${categoryArticle.categoryId}/page/1`}>
                        <a>
                        <Button>{`${categoryArticle.categoryName}の記事一覧へ`}
                          <Box m={1}><GrNext color="gray" /></Box>
                        </Button>
                        </a>
                      </NextLink>
                    </Box>
                  </TabPanel>
                ))
              }
            </TabPanels>
          </Tabs>
        </Box>
            
      </div>
    </Layout>
  )
}

export default Home
