import { NextPage } from "next";
import Layout from "../../../components/layout";
import Seo from "../../../components/Seo";

const ArtWorks:NextPage=()=>{
  return (
    <Layout>
     <Seo title={'作品'} isHome={false} imageUrl={""} description={'やかんの作品集'} />
      <div>Coming soon...</div>
    </Layout>
  )
}

export default ArtWorks;