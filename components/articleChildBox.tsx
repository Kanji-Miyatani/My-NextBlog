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
        <Box className="article-child-box" w={{sm:280,base:"100%"}} h={{sm:280,base:"72vw"}} bg="white" boxShadow="md" _hover={{boxShadow:"xl",opacity:"0.8"}} rounded="md" p="6" overflow="hidden">
          <NextLink href={`/blog/${id}`} >
            <a>
                <Box position="relative" maxH={{sm:175,base:"45vw"}} h={{sm:175,base:"45vw"}} mt="-6" mx="-6" pos="relative" overflow='hidden'>
                   <Flex
                      color="blue.500"
                      fontWeight="800"
                      fontSize="xs"
                      letterSpacing="wide"
                      position="relative" zIndex={10}
                      left="0"
                      top="0"
                      >
                        {
                          aMonthAgo<date?(
                            <Badge h="1.8rem" w="3.3rem" lineHeight="1.8rem" textAlign="center" borderRadius="0px" zIndex={10} colorScheme='green' fontSize="0.9rem">new</Badge>
                          ):<></>
                        }
                        {blogTag.map((tag,i) => (
                          <Badge ml={1} key={i} h="1.1rem" mt="2px"><Box>{tag.tag}</Box></Badge>
                      ))}
                    </Flex>
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
           
            <NextLink href={`/blog/${id}`} >
            <a>
              <Heading as='h4' color="gray.700" padding="auto" my="auto" size='md' noOfLines={2}>
                {title}
              </Heading>
            </a>
          </NextLink>
          </Stack>
          <Stack mt="2" direction="row" spacing="4" align="center">
            <Stack direction="row" spacing="0" fontSize="sm">
              <Text color="gray.500" mr="1rem">{ToDateString(date)}</Text>
              <NextLink href={`/category/${categoryID}/page/1`} >
                <Link fontWeight="600">{categoryName}</Link>
              </NextLink>
            </Stack>
          </Stack>
        </Box>
    )
  }

  export default ArticleChildBox;