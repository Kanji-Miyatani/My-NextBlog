import Head from 'next/head';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react'
import Nav from './navbar'
type Props = {
    children?:React.ReactNode
    title?:string
    description?:string
}

 export default function Layout({children,title,description}:Props){
    return(
        <div className="container">
            <Head>
                <title>{title}</title>
                <meta name="desctiption" content={description} />
            </Head>
            <Nav children={children}/>
        </div>
    )
 }