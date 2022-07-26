import React, { useState } from 'react';
import {
  Box, Flex, Heading, Text, Stack, Avatar, Image,Badge,Link
} from '@chakra-ui/react';
import NextLink from 'next/link';
import NextImage from 'next/image'
import { ITags } from '../interface/article';
import { ToDateString } from '../lib/dateService';


interface IBlogChild{
  id:string;
  title:string;
  description:string;
  imageSrc:string;
  blogTag:Array<ITags>;
  date:Date;
  categoryName:string;
  categoryID:string;
}
//記事説明の表示文字数
const MAX_DESCRIPTION_LENGTH=75;
//記事一覧表示のアイテム
function ArticleChildBox({id,title,description,imageSrc,blogTag,date,categoryName,categoryID}:IBlogChild) {
  var today = new Date();
  today.setMonth(today.getMonth()-1);
  var aMonthAgo =today;
  description = description?.length>MAX_DESCRIPTION_LENGTH ? description.substring(0,MAX_DESCRIPTION_LENGTH)+"...":description;
 
    return (
        <Box className="article-child-box" w={{sm:260,base:"100%"}} h={{sm:270,base:230}} bg="white" boxShadow="md" _hover={{boxShadow:"xl",opacity:"0.8"}} rounded="xl" p="6" overflow="hidden">
          <NextLink href={`/blog/${id}`} >
            <a>
                <Box position="relative" maxH={{sm:120,base:130}} h={{sm:120,base:120}} mt="-6" mx="-6" pos="relative" overflow='hidden'>
                  {
                    aMonthAgo<date?(
                      <Badge position="relative" zIndex={10} bgColor="teal.100" left={2}>new</Badge>
                    ):<></>
                  }
                  <NextImage
                    src={imageSrc}
                    alt="記事画像"
                    objectFit='cover'
                    layout='fill'
                  />
                </Box>
            </a>
          </NextLink>
          <Stack mt="2" verticalAlign="center">
            <Flex
              color="blue.500"
              fontWeight="800"
              fontSize="xs"
              letterSpacing="wide"
            >
                {blogTag.map((tag,i) => (
                  <Badge ml={1} key={i}><Box>{tag.tag}</Box></Badge>
              ))}
            </Flex>
            <NextLink href={`/blog/${id}`} >
            <a>
              <Heading as='h4' color="gray.700" padding="auto" my="auto" size='md' noOfLines={2}>
                {title}
              </Heading>
            </a>
          </NextLink>
          </Stack>
          <Stack mt="2" direction="row" spacing="4" align="center">
            <Stack direction="column" spacing="0" fontSize="sm">
            <NextLink href={`/category/${categoryID}/page/1`} >
              <Link fontWeight="600">{categoryName}</Link>
            </NextLink>
              <Text color="gray.500">{ToDateString(date)}</Text>
            </Stack>
          </Stack>
        </Box>
    )
  }

  export default ArticleChildBox;