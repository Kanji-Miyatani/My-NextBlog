import Head from 'next/head';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react'
import Nav from './navbar'
import Header from './header';
type Props = {
    children?:React.ReactNode
    title?:string
    description?:string
}

 export default function Layout({children}:Props){
    return(
        <Box w={{sm:1160,base:"auto"}} ml="auto" mr="auto">
            <Header/>
            <Nav>{children}</Nav>
        </Box>
    )
 }