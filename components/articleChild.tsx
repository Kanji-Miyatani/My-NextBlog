import React from 'react';
import {
  Box,
  Link,
  Image,
  Badge
} from '@chakra-ui/react';

interface IBlogChild{
  title:string;
  description:string;
  imageSrc:string;
  blogTag:Array<{name:string}>;
  date:Date;
}
//記事一覧表示のアイテム
function ArticleChild({title,description,imageSrc,blogTag,date}:IBlogChild) {
  var today = new Date();
  today.setMonth(today.getMonth()-1);
  var threeMonthAgo =today;
    return (
      <Box className="article-child" maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Link>
            {/* アイキャッチ */}
            <Image src={imageSrc} alt={"画像"} />
            <Box p='6'>
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
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                noOfLines={1}
            >
                {title}
            </Box>
                {/* 説明 */}
            <Box>
                <Box as='span' color='gray.600' fontSize='sm'>
                {description}
                </Box>
            </Box>
            <Box display='flex' mt='2' alignItems='center'>
                {blogTag.map(tag => (
                    <Badge>{tag.name}</Badge>
                ))}
                {/* 日付 */}
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {date.toLocaleDateString()}
                </Box>
            </Box>
            </Box>
          </Link>
      </Box>
    )
  }

  export default ArticleChild;