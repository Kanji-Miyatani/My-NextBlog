import React from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';

  interface IBlogChild{
    title:string;
    description:string;
    imageSrc:string;
    blogTag:Array<{name:string}>;
  }
//記事一覧表示のアイテム
const MainArticle =({title,description,imageSrc,blogTag}:IBlogChild)=>{
    return (
        <>
      <Box
       borderRadius={"15px"} bgColor={"white"}
        maxW={'7xl'} minH={"30vh"} p="0" m="0"
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
          <Box
             className="Pickup-Image"
             width={{ base: '100%', sm: '60%' }}
             minH={{ base: '80%', sm: 'auto' }}
             height={{ base: '120px', sm: 'auto' }}
             >
              <Image
                height={'100%'}
                zIndex="2"
                borderRadius="lg"
                src={imageSrc}
                alt="ブログイメージ"
                objectFit="cover"
              />
          </Box>
          <Box
            className="Pickup-Text"
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}>
              {
                  blogTag?blogTag.map((tag,i)=>(
                      <Tag key={i}>{tag.name}</Tag>
                  )):<></>
              }
          
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg">
              {description}
            </Text>
          </Box>
      </Box>
      </>
    )
} 

export default MainArticle;