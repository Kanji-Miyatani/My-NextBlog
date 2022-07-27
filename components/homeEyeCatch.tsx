import { Container, chakra,Image, HTMLChakraProps,Heading ,Text, Box,Flex,Collapse,Fade} from '@chakra-ui/react';
import { motion, isValidMotionProp,useAnimation, HTMLMotionProps } from 'framer-motion';
import { useState } from 'react';
  
const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});
  
export default function HomeEyeCatch() {
    const [isClicked,setIsClicked]=useState(false);
    const control = useAnimation();
    const OnClickEvent = ()=>{
        //クリック時のやかんの動き
        control.start({
            scaleX: [1,0.9,0.9,0.9,0.9,0.9, 1.2, 1],
            scaleY: [1,0.8,0.8,0.75,0.75,0.7, 1.1, 1],
            x: [0,1,-1,2,-2,0, 0, 0],
            });
        setTimeout(()=>setIsClicked(true),1500);
    }
    type Merge<P, T> = Omit<P, keyof T> & T
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>

const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);
  return (
    <Container p="20px" minH="260px" minW="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center"  bgColor="teal.800">
        <Heading as="h1" color="white" fontFamily="serif">Yakan君の今日の一言</Heading>
        <Flex h="100%" w="100%" flexDir={{sm:"row",base:"row"}} alignItems="end" justifyContent="center">
            <MotionBox
                onClick={OnClickEvent}
                animate={control}
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
            <Image src='/images/やかんの無料アイコン素材.png' alt="やかんのアイコン"></Image>
            </MotionBox>
             <Collapse in={isClicked}>
                <Box m="1">
                    <Box 
                    m="30px" noOfLines={{sm:4,base:6}} fontFamily="serif" fontSize="1.4rem" fontWeight="medium" bgColor="white" boxShadow="0 0 14px 15px #ffffff" textAlign="center" borderRadius="50%" p="1rem" w={{sm:"300px",base:"150px"}}>
                        ナスはグロい！
                    </Box>
                </Box>
             </Collapse>
        </Flex>
      <Text textColor="gray.400" mr="5" onClick={OnClickEvent} _hover={{cursor:"pointer", color:"white"}}>Click!</Text>
    </Container>
  )
}