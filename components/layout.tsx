import Head from 'next/head';
import { Box } from '@chakra-ui/react'
import Nav from './navbar'
import Header from './header';
import Footer from './footer';
import { IBreadCrumbData } from '../interface/domestic';
type Props = {
    children?:React.ReactNode
    breadCrumbData:IBreadCrumbData
}

 export default function Layout({children,breadCrumbData}:Props){
    return(
        <Box w={{md:"auto",base:"auto"}} my={0} mx="auto" shadow="lg">
            <Header/>
            <Nav>{children}</Nav>
            <Footer breadCrumbData={breadCrumbData}/>
        </Box>
    )
 }