import React from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
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
    <Container maxW={'7xl'} p="10" m="0" mt="5" border={"solid 1px"} borderColor={"blue.100"} borderRadius={"15px"}>
      <Heading as="h1">{title}</Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={imageSrc}
                alt="ブログイメージ"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
            {
                blogTag?blogTag.map(tag=>(
                    <Tag>{tag.name}</Tag>
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
    </Container></>
    )
} 

export default MainArticle;