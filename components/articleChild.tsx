import React from 'react';
import {
  Box,
  Badge,
  Flex,
  Heading
} from '@chakra-ui/react';
import Link from 'next/link';
import NextImage from 'next/image'


interface IBlogChild{
  id:string;
  title:string;
  description:string;
  imageSrc:string;
  blogTag:Array<{name:string}>;
  date:Date;
}
//記事説明の表示文字数
const MAX_DESCRIPTION_LENGTH=75;
//記事一覧表示のアイテム
function ArticleChild({id,title,description,imageSrc,blogTag,date}:IBlogChild) {
  var today = new Date();
  today.setMonth(today.getMonth()-1);
  description = description.length>MAX_DESCRIPTION_LENGTH ? description.substring(0,MAX_DESCRIPTION_LENGTH)+"...":description;
  var threeMonthAgo =today;
    return (
      <Box className="article-child" borderWidth='1px' borderRadius='lg' h={150} overflow="hidden"  bgColor={'white'} shadow="sm" _hover={{shadow:"md",cursor:"pointer"}}>
          <Link href={`/blog/${id}`} >
            {/* アイキャッチ */}
            <Box   
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            minW="100%"
            maxW="100%">
              <Box minW={{base:'100%',sm:'30%'}} h={150} overflow='hidden'>
                <Box w={"100%"} h={"100%"} position="relative">
                  <NextImage
                    layout='fill'
                    objectFit="fill"
                    src={imageSrc} alt={"画像"} />
                </Box>
              </Box>
              <Flex px={5} py={3} minH={"100%"} display='flex' flexDirection={"column"}>
                <Box display='flex' alignItems='baseline'>
                  {
                      date >= threeMonthAgo?(
                      <Badge borderRadius='full' px='2' colorScheme='teal'>
                      New
                      </Badge>
                      )
                      :(<></>)
                  }
                </Box>
                {/* タイトル */}
                <Box
                    fontWeight='semibold'
                    lineHeight='tight'
                    noOfLines={1}
                    h="30px"
                >
                  <Heading as='h4' size='md'padding={"auto"} my={"auto"} textAlign={"left"}>
                    {title}
                  </Heading>
                </Box>
                {/* 説明 */}
                <Box as='span' color='gray.600' fontSize='sm' 
                    flex="1">
                {description}
                </Box>
                {/*タグ*/}
                <Box display='flex' mt='2' alignItems='center' overflow={"hidden"} h={"20%"}>
                    {blogTag.map((tag,i) => (
                        <Badge key={i}>{tag.name}</Badge>
                    ))}
                {/* 日付 */}
                </Box>
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {date.toLocaleDateString()}
                </Box>
              </Flex>
            </Box>
          </Link>
      </Box>
    )
  }

  export default ArticleChild;