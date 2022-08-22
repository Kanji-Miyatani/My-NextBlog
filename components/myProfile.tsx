import { Box ,Flex,Heading,Text,Link,Spacer} from "@chakra-ui/react"
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
         <Box>
           <NextImage src="/images/MyPhoto.jpg" className="rounded-full" objectFit="cover" height={80}width={80} />
         </Box>
         <Heading as='h4' size='md' w="50%" padding={"auto"} ml={3} my={"auto"} textAlign={"left"}>
          Yakan
         </Heading>
       </Box>
       <Box m={3}>
         <Text fontSize='15px' >
           田舎育ちのアナログ人間ですが、システム作ってます。<br/>趣味の制作はWebアプリ中心です。<br/>仕事は業務系なのでC#メインで書いてます。
         </Text>
       </Box>
       <Flex mb={2}>
          <Link target="_blank" rel="noopener noreferrer" href="https://twitter.com/yakan09025012">
            <Box _hover={{opacity:"0.7"}} p={1}><AiFillTwitterCircle color="#00acee" size="2.4rem" /></Box>
          </Link>
          <Link href="" target="_blank" rel="noopener noreferrer">
            <Box _hover={{opacity:"0.7",size:"2rem"}} p={1}><AiFillGithub color="#000000" size="2.4rem" /></Box>
          </Link>
       </Flex>
     </Box>
    )
  }

  export default MyProfile;