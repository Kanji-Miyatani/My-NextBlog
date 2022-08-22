import { Container, chakra, HTMLChakraProps,Heading ,Text, Box,Flex,Collapse,keyframes} from '@chakra-ui/react';
import { motion,useAnimation, HTMLMotionProps } from 'framer-motion';
import { useState } from 'react';
import NextImage from "next/image"
  
export default function HomeEyeCatch() {
    const [isClicked,setIsClicked]=useState(false);
    const yakanControl = useAnimation();
    const OnClickEvent = ()=>{
        //クリック時のやかんの動き
        yakanControl.start({
            scaleX: [1,0.9,0.9,0.9,0.9,0.9, 1.2, 1],
            scaleY: [1,0.8,0.8,0.75,0.75,0.7, 1.1, 1],
            x: [0,1,-1,2,-2,0, 0, 0],
            });
        setTimeout(()=>setIsClicked(true),1500);
    }
    type Merge<P, T> = Omit<P, keyof T> & T
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>

const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);
const animationKeyframes = keyframes`
  0% {  background-position: 0% 0; }
  100% { background-position:-880px 0;}
`;
const animation = `${animationKeyframes} 100s linear infinite`;
const MotionBackBox: React.FC<MotionBoxProps> = motion(chakra.div);
  return (
    <Container 
    as ={motion.div}
    animation={animation}
 
     p="20px" h="auto" minH="270px" minW="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" 
      bgImage="images/トップ背景-min.png" bgSize="880px 100%" bgRepeat="repeat-x">
        <Heading as="h1" color="white" fontFamily="serif">やかんのブログ</Heading>
        <Flex h="100%" w="100%" flexDir={{md:"row",base:"row"}} alignItems="end" justifyContent="center">
            <MotionBox
                onClick={OnClickEvent}
                animate={yakanControl}
                // @ts-ignore no problem in operation, although type error appears.
                transition={{
                duration: 1.5,
                }}
                _hover={{cursor:"pointer"}}
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="5rem"
                height="5rem"
            >
            <NextImage src='/images/YakanLogo-min.png' objectFit='cover' height="100px" width="100px" alt="やかんのアイコン"></NextImage>
            </MotionBox>
             <Collapse in={isClicked}>
                <Box m="1">
                    <Box 
                    m="30px" noOfLines={{md:4,base:6}} fontFamily="serif" fontSize="1.4rem" fontWeight="medium" bgColor="white" boxShadow="0 0 14px 15px white" textAlign="center" borderRadius="10%" p="1rem" w={{md:"300px",base:"150px"}}>
                        {"自己紹介-"}<a href='/'>aaaa</a>
                    </Box>
                </Box>
             </Collapse>
        </Flex>
      <Text textColor="gray.400" mr="5" onClick={OnClickEvent} _hover={{cursor:"pointer", color:"white"}}>Click!</Text>
    </Container>
  )
}