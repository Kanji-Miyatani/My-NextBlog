import Layout from '../../../components/layout';
import { IArticle, ITocs} from '../../../interface/article';
import {getAllPostIds, getPost, getTocs} from '../../../lib/posts';
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'node:querystring';
import BlogDetail from '../../../components/blogDetail';
import Seo from '../../../components/Seo';
import { CreateBreadCrumbdata } from '../../../lib/dataConvert';
import {  Grid, GridItem, Heading } from '@chakra-ui/react';
import ArticleChildBox from '../../../components/ArticleChildBox';
//取得データ
interface Props {
  item: IArticle
  tocs : ITocs[]
}
// 1. Paramsの型を定義し、ParsedUrlQueryをextendsする
interface Params extends ParsedUrlQuery {
  id: string
}

export default function Post({item,tocs}:Props) {
  const relatedLinks =item.RelatedLinks;
  return (
        <Layout breadCrumbData={CreateBreadCrumbdata(item.title,`/blog/${item.id}`,item.category?.name,`/category/${item.category?.id}/page/1`,)}> 
          <Seo title={item.title} isHome={false} imageUrl={item.eyecatch.url} description={`${item.title}|${item.description}`} path={`blog/${item.id}`}/>
          <BlogDetail article={item} tocs={tocs}></BlogDetail>
          <Heading  as="h4" fontSize={25} borderBottom="2px double gray" mx="auto" mt="1.5rem" mb="3" textAlign="center">関連記事</Heading>
          <Grid className="container-" templateColumns={{lg:'repeat(3, 1fr)',md:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',base:'repeat(1, 1fr)'}} gap={6} mt="5" h="auto">
                    {relatedLinks.length==0?
                    <></>:
                    relatedLinks.map((article,index)=>(
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
        </Layout>
        )
}


//静的生成項目ID一覧を取得
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const items = await getAllPostIds();
  const paths = items.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}
//静的生成のデータ取得
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const item = await getPost(params!.id);
  const tocs = getTocs(item);
  return {
    props: {
      item,
      tocs
    },
  }
}