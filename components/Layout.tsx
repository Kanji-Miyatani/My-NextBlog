import { Box } from '@chakra-ui/react'
import Nav from './Navbar'
import Header from './Header';
import Footer from './Footer';
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