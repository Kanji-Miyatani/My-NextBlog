import React from 'react'
import {Box,color,Text,List,ListItem} from '@chakra-ui/react'
import {  ITocs } from '../interface/article'
import { Link as Scroll } from 'react-scroll';
type Prop={
    tocs : ITocs[]
}
function ContentsTable(prop:Prop) {
    const tocs =prop.tocs;
  return (
    <Box bgColor={'gray.100'} p="1rem" borderRadius="10px">
     <Text fontWeight={'bold'} mb="1rem">目次</Text>
     <List >
        {tocs.map(toc=>{
            const marginLeft = toc.name=="h2"?"0":"1rem";
            return(
            <ListItem key={toc.id} ml={marginLeft} mb="4px" color={"gray.500"} _hover={{color:"gray.600",cursor:"pointer"}}>
                <Scroll to={toc.id}>- {toc.text}</Scroll>
            </ListItem>
        )})}
     </List>
    </Box>
  )
}

export default ContentsTable