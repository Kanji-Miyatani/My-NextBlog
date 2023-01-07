import { NextPage } from "next";
import Layout from "../../../components/Layout";
import Seo from "../../../components/Seo";
import { CreateBreadCrumbdata } from "../../../lib/dataConvert";

const ArtWorks:NextPage=()=>{
  
  return (
    <Layout breadCrumbData={CreateBreadCrumbdata("作品一覧","artworks")}>
     <Seo title={'作品'} isHome={false} imageUrl={""} description={'やかんの作品集'} path={"artworks"} />
      <div>Coming soon...</div>
    </Layout>
  )
}

export default ArtWorks;