import {Box,Text} from "@chakra-ui/react"
import { IBreadCrumbData } from "../interface/domestic"
import BreadCrumb from "./breadCrumb"
import MyProfile from "./myProfile"
type Props={
  breadCrumbData:IBreadCrumbData
}
function footer({breadCrumbData}:Props) {
  return (
    <Box>
        {/* モバイル用 */}
        <Box display={{base:"block",md:"none"}}>
            <MyProfile />
        </Box>
        <Box bg={"teal.500"} textAlign="center" p="1rem">
          <BreadCrumb 
          nowPage={breadCrumbData.nowPage}
          nowPagePath={breadCrumbData.nowPagePath}
          parentPage={breadCrumbData.parentPage}
          parentPagePath={breadCrumbData.parentPagePath} />
         <Text as='sub'>&copy; 2022 - 2023 Yakan.</Text>
        </Box>
    </Box>
  )
}

export default footer