import {Box} from "@chakra-ui/react"
import MyProfile from "./myProfile"

function footer() {
  return (
    <Box>
        {/* モバイル用 */}
        <Box display={{base:"block",sm:"none"}}>
            <MyProfile />
        </Box>
    </Box>
  )
}

export default footer