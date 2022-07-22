import { Box ,Flex,Heading,Text} from "@chakra-ui/react"
import NextImage from "next/image"
import {
  AiFillTwitterCircle,
  AiFillGithub
} from 'react-icons/ai'; 
const MyProfile=()=>{
    return(
      <Box display={"flex"}
           mb={2} mt={2} mx={2} p={"3px"} 
          border={"1px"} borderColor={"gray.100"} borderRadius="5px"
          bgColor="white"
          shadow="md" flexDirection="column" alignItems={"center"}>
       <Box display={"flex"} h={"80px"} m={3}>
         <Box borderRadius={"50%"} overflow="hidden">
           <NextImage src="/images/yakanKun.png" layout="fixed" objectFit="cover" height={80}width={80} />
         </Box>
         <Heading as='h4' size='md' w="50%" padding={"auto"} ml={3} my={"auto"} textAlign={"left"}>
         Kanji Miyatani
         </Heading>
       </Box>
       <Box m={3}>
         <Text fontSize='15px' >
           駆け出しエンジニア1年。<br/>趣味の制作はWebアプリ中心。<br/>仕事は業務系なのでC#メインで書いてます。
         </Text>
       </Box>
       <Flex>
         <Box><AiFillTwitterCircle color="#00acee" size="2.4rem" /></Box>
         <Box><AiFillGithub color="#000000" size="2.4rem" /></Box>
       </Flex>
     </Box>
    )
  }

  export default MyProfile;