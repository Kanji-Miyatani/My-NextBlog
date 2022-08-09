import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IMicroCMSBlogRes } from "../../../interface/article";
import { getAllPosts, getPostsInPages } from "../../../lib/posts";
import Layout from '../../../components/layout';
import Seo from "../../../components/Seo";
import BlogList from "../../../components/blogList";
import { CreateBreadCrumbdata } from "../../../lib/dataConvert";
const MAX_PAGE =10 as const;
type Prop={
    datas:IMicroCMSBlogRes,
    page:number
}

const DynamicPage:NextPage<Prop> =({datas,page})=>{
    const articles = datas.contents;
    return(
        <>
         <Layout breadCrumbData={CreateBreadCrumbdata("ブログ一覧",`/page/${page}`,)}>
            <Seo title='ブログ一覧' isHome={true} imageUrl={""} description="やかんブログの記事一覧です。" path="page/1" />
            <BlogList  datas={datas} page={page} maxCountInPage={MAX_PAGE} />
         </Layout>
        </>
    )
}

export const getStaticPaths:GetStaticPaths =async () => {
    const blogsCount = (await getAllPosts()).length;
    const paths = [...Array(Math.ceil(blogsCount/MAX_PAGE))].map((_,i)=>{
        return {
            params:{
                page:`${i+1}`
            }
        }
    })
    return {paths,fallback:false }
}

export const getStaticProps:GetStaticProps = async({params})=>{
    const page = params?.page ? String(params?.page) : '0';
    const datas =await getPostsInPages(MAX_PAGE,Math.ceil(Number.parseInt(page, 10) - 1)*MAX_PAGE);
    return {
        props:{
            datas,
            page
        }
    }
}
export default DynamicPage;