import React from 'react';
import {
  Box,
  Badge,
  Flex,
  Heading
} from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/image'
import { ITags } from '../interface/article';


interface IBlogChild{
  id:string;
  title:string;
  description:string;
  imageSrc:string;
  blogTag:Array<ITags>;
  date:Date;
}
//記事説明の表示文字数
const MAX_DESCRIPTION_LENGTH=75;
//記事一覧表示のアイテム
function ArticleChild({id,title,description,imageSrc,blogTag,date}:IBlogChild) {
  var today = new Date();
  today.setMonth(today.getMonth()-1);
  var threeMonthAgo =today;
  description = description?.length>MAX_DESCRIPTION_LENGTH ? description.substring(0,MAX_DESCRIPTION_LENGTH)+"...":description;


    return (
      <Box className="article-child" borderWidth='1px' borderRadius='lg' h={{base:150,sm:150}} overflow="hidden"  bgColor={'white'} shadow="sm" _hover={{shadow:"lg",cursor:"pointer"}}>
          <NextLink href={`/blog/${id}`} >
            <a>
            {/* アイキャッチ */}
            <Box   
            display="flex"
            minW="100%"
            maxW="100%">
              <Box minW={{base:"40%",sm:"30%"}} h={{base:"150",sm:150}} overflow='hidden'>
                <Box w={"100%"} h={"100%"} position="relative">
                  <NextImage
                    layout='fill'
                    objectFit="cover"
                    src={imageSrc} alt={"画像"} />
                </Box>
              </Box>
              <Flex px={5} py={3} flex={{base:1,sm:'100%'}} display='flex' flexDirection={"column"} justifyContent="space-between">
               
                {/* タイトル */}
                <Box display='flex' alignItems='center' py={2}>
                    {
                      date >= threeMonthAgo?(
                        <Badge borderRadius='full' px='2' mx={2} colorScheme='teal'>
                      New
                      </Badge>
                      )
                      :(<></>)
                    }
                    <Box
                      fontWeight='semibold'
                      lineHeight='tight'
                      noOfLines={2}
                    >
                    <Heading as='h4' size='md'padding={"auto"} my={"auto"} textAlign={"left"} >
                      {title}
                    </Heading>
                  </Box>
                </Box>
                {/* 説明 */}
                <Box as='span' color='gray.600' fontSize='sm' 
                    flex="1">
                {description}
                </Box>
                {/*タグ*/}
                <Box display='flex' mt='2' alignItems='center' overflow={"hidden"} h={"20%"}>
                    {blogTag.map((tag,i) => (
                        <Badge ml={1} key={i}><Box>{tag.tag}</Box></Badge>
                    ))}
                {/* 日付 */}
                </Box>
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {date.toLocaleDateString()}
                </Box>
              </Flex>
            </Box>
            </a>
          </NextLink>
      </Box>
    )
  }

  export default ArticleChild;