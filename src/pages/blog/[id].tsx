import Layout from '../../../components/layout';
import { IArticle } from '../../../interface/article';
import {getAllPostIds, getPost} from '../../../lib/posts';
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'node:querystring';
import BlogDetail from '../../../components/blogDetail';
//取得データ
interface Props {
  item: IArticle
}
// 1. Paramsの型を定義し、ParsedUrlQueryをextendsする
interface Params extends ParsedUrlQuery {
  id: string
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
  const item = await getPost(params!.id)

  console.log(item)
  return {
    props: {
      item,
    },
  }
}

export default function Post({item}:Props) {
  var html =item.content;
  return (
        <Layout> 
          <BlogDetail article={item}></BlogDetail>
        </Layout>
        )
}