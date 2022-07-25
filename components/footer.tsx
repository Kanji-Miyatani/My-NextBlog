import {Box} from "@chakra-ui/react"
import BreadCrumb from "./breadCrumb"
import MyProfile from "./myProfile"

function footer() {
  return (
    <Box>
        {/* モバイル用 */}
        <Box display={{base:"block",sm:"none"}}>
            <MyProfile />
        </Box>
        <Box bg={"teal.500"} textAlign="center" p="1rem">
          <BreadCrumb></BreadCrumb>
        </Box>
    </Box>
  )
}

export default footer