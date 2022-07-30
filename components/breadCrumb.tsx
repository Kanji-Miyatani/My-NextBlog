import React from 'react'
import NextLink from 'next/link'
import{Box,Breadcrumb,BreadcrumbItem,BreadcrumbLink,Flex}from '@chakra-ui/react'
import {AiOutlineRight,AiFillHome, } from 'react-icons/ai'
import { IBreadCrumbData } from '../interface/domestic'

function BreadCrumb({nowPage="",nowPagePath="",parentPage="",parentPagePath=""}:IBreadCrumbData) {
    if(nowPage=="" )
    return <></>
    else
  return (
    <Breadcrumb mx="auto" spacing='8px' separator={<AiOutlineRight color='' />} textAlign="center">
        <BreadcrumbItem>
            <BreadcrumbLink href='/'>
                    <Box ml="1">ホーム</Box>
            </BreadcrumbLink>
        </BreadcrumbItem>
        {
            parentPage==""?<></>:
            <BreadcrumbItem>
                <NextLink href={parentPagePath}>
                    <BreadcrumbLink>{parentPage}</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
        }
        {
            nowPage==""?<></>:
            <BreadcrumbItem isCurrentPage>
                <NextLink href={nowPagePath}>
                    <BreadcrumbLink>{nowPage}</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
        }
    </Breadcrumb>
  )
}

export default BreadCrumb